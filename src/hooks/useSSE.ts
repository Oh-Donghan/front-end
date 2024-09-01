import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToast } from '@chakra-ui/react';
import { eventSourceState } from '../recoil/atom/eventSourceAtom';
import { lastEventIdState } from '../recoil/atom/lastEventIdAtom';

export function useSSE() {
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const [lastEventId, setLastEventId] = useRecoilState(lastEventIdState);
  const toast = useToast();

  useEffect(() => {
    if (eventSource) {
      return; // 이미 구독 중인 경우 새로운 연결을 하지 않음
    }

    const token = localStorage.getItem('accessToken');
    const url = `https://dddang.store/api/members/notification/subscribe`;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (lastEventId) {
      headers['Last-Event-ID'] = lastEventId;
    }

    const es = new EventSourcePolyfill(url, {
      headers,
      withCredentials: true,
    });

    es.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log('New notification:', data);

      // lastEventId를 업데이트
      setLastEventId(event.lastEventId);

      toast({
        title: '새로운 알림이 도착했습니다.',
        description: data.message,
        status: 'info',
        duration: 2000,
      });
    };

    es.onerror = error => {
      console.error('SSE connection error:', error);
      toast({
        title: '연결 오류',
        description: '알림 서버와의 연결에 문제가 발생했습니다. 재시도 중...',
        status: 'error',
        duration: 2000,
      });

      es.close();
      setEventSource(null);

      // 일정 시간 후 재연결 시도 (예: 5초 후)
      setTimeout(() => {
        if (!eventSource) {
          const newEs = new EventSourcePolyfill(url, {
            headers,
            withCredentials: true,
          });
          setEventSource(newEs);
        }
      }, 5000);
    };

    setEventSource(es);

    return () => {
      if (es) {
        es.close();
      }
    };
  }, [eventSource, lastEventId, setEventSource, setLastEventId, toast]);

  return eventSource;
}
