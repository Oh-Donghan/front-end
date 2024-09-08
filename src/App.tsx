import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecoilProvider from './recoil/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventSourceState } from './recoil/atom/eventSourceAtom';
import { authState } from './recoil/atom/authAtom';
import { useEffect } from 'react';
import { isNewNotificationState } from './recoil/atom/alarmAtom';
import { useToast } from '@chakra-ui/react';

const queryClient = new QueryClient();

function App() {
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const auth = useRecoilValue(authState);
  const [, setIsNewNotification] = useRecoilState(isNewNotificationState);
  const toast = useToast();

  // 새로고침을 눌러도 로그인 되어있다면 SSE 다시연결
  useEffect(() => {
    if (auth) {
      const memberId = localStorage.getItem('memberId');
      const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

      // 기존 SSE 연결을 닫음
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }

      // SSE 연결 설정
      const url = new URL('https://dddang.store/api/members/notification/subscribe');
      if (lastEventId) {
        url.searchParams.append('lastEventId', lastEventId);
      }
      if (memberId) {
        url.searchParams.append('memberId', memberId);
      }

      const source = new EventSource(url.toString());
      source.addEventListener('sse', e => {
        if (e.data.startsWith('{')) {
          try {
            const eventData = JSON.parse(e.data);
            console.log(eventData);

            if (!eventData.dummyContent) {
              // 새로운 알림 도착 시 상태 업데이트
              setIsNewNotification(true);

              // last event id를 로컬 스토리지에 저장
              const memberId = localStorage.getItem('memberId');
              if (memberId && eventData.id) {
                localStorage.setItem(`last-event-id-${memberId}`, eventData.id.toString());
              }

              // 경매종료 알림을 받을 경우 경매 아이템 리패치
              if (
                eventData.notificationType === 'DONE_INSTANT' ||
                eventData.notificationType === 'DONE'
              ) {
                queryClient.invalidateQueries({
                  predicate: query =>
                    Array.isArray(query.queryKey) && query.queryKey.includes('items'),
                });
              }

              // 구매확정 알림을 받을 경우 경매 경매 채팅방 리패치
              if (eventData.notificationType === 'CONFIRM') {
                console.log('구매가 확정되었습니다.');

                toast({
                  title: eventData.content,
                  status: 'success',
                  duration: 1500,
                });

                queryClient.invalidateQueries({
                  predicate: query =>
                    Array.isArray(query.queryKey) && query.queryKey.includes('chat'),
                });
              }
            }
          } catch (error) {
            console.error('Failed to parse event data:', error);
          }
        }
      });

      source.onopen = () => {
        console.log('SSE 연결 성공');
      };

      source.onerror = e => {
        console.error('SSE 연결 오류:', e);
      };

      setEventSource(source);

      return () => {
        if (source) {
          source.close();
        }
      };
    }
  }, []);

  return (
    <RecoilProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilProvider>
  );
}

export default App;
