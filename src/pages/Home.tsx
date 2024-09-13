import Banner from '../components/main/banner/Banner';
import Categories from '../components/main/categories/Categories';
import SwiperItemList from '../components/main/item/SwiperItemList';
import SwiperHotItemList from '../components/main/item/SwiperHotItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import { Box, useToast } from '@chakra-ui/react';
import Input from '../components/main/input/input';
import { useLocation, useNavigate } from 'react-router-dom';
import TopButton from '../components/common/button/TopButton';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atom/authAtom';
import { getCategories } from '../axios/category/categories';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Client } from '@stomp/stompjs';
import { auctionState } from '../recoil/atom/auctionPriceAtom';
import { eventSourceState } from '../recoil/atom/eventSourceAtom';
import { isNewNotificationState } from '../recoil/atom/alarmAtom';

export default function Home() {
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const [, setAuctionArray] = useRecoilState(auctionState);
  const [, setIsNewNotification] = useRecoilState(isNewNotificationState);
  const queryClient = useQueryClient();
  const toast = useToast();

  // SSE 연결
  const connectSSE = (lastEventId, memberId) => {
    const sseConnect = async () => {
      if (eventSource) {
        console.log('Unsubscribed from notifications');
        eventSource.close();
        setEventSource(null);
      }

      // last-event-id와 memberId를 URL의 쿼리 파라미터로 포함.
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
                const userId = eventData.content.split('님')[0];
                alert(`userId: ${userId} --- memberId: ${memberId}`);
                if (userId !== memberId) {
                  // 판매자에게만 toast를 보여줌
                  toast({
                    title: eventData.content,
                    status: 'success',
                    duration: 1500,
                  });
                }
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

      source.onerror = function (e) {
        console.error('SSE error occurred:', e);
        // source.close(); // 에러가 발생시 SSE 연결을 닫음
      };

      setEventSource(source);
      console.log('Subscribed to notifications');
    };

    sseConnect();
  };

  // 소셜 로그인 후 redirect 주소에 있는 accessToken을 Recoil에 저장
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const memberId = queryParams.get('memberId');
    const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

    if (accessToken && memberId) {
      console.log('소셜로그인 SSE 연결');

      setIsProcessingAuth(true);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      console.log('Access Token saved:', accessToken);

      localStorage.setItem('memberId', memberId);
      console.log('Member ID saved:', memberId);

      // SSE 연결
      connectSSE(lastEventId, memberId);

      // Recoil 상태 업데이트
      setAuth(true);

      // URL에서 쿼리 파라미터 제거
      navigate('/', { replace: true });
      setIsProcessingAuth(false);
    }
  }, [location, navigate]);

  // 웹소켓 연결 및 구독 설정
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'wss://dddang.store/auction-websocket',
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      // 경매 입찰 성공 메시지 구독
      stompClient.subscribe('/sub/auction-all', message => {
        const bidData = JSON.parse(message.body);
        console.log('Received bid data:', bidData);
        setAuctionArray(prev => {
          // 기존 배열에서 동일한 auctionId를 가진 객체 제거
          const updatedArray = prev.filter(item => item.auctionId !== bidData.auctionId);

          // 새로운 bidData를 추가한 배열 반환
          return [...updatedArray, bidData];
        });
      });
    };

    stompClient.onStompError = frame => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    stompClient.onWebSocketClose = event => {
      console.error('WebSocket connection closed:', event);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log('WebSocket disconnected');
    };
  }, []);

  // getCategories의 isLoading을 ItemList에도 전달하기 위해 home에서 카테고리 패칭
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  if (isProcessingAuth) {
    {
      /* 유저 정보 localStorage에 저장중엔 안 보이게 처리*/
    }
    return <></>;
  }

  return (
    <Box minW="375px">
      <TopButton />
      <ChatModal />
      <Banner />
      <Input />
      <Categories categories={categories} isCategoryLoading={isLoading} />

      <Box minW="345px" px={8} overflowX="hidden">
        {/* 지금 핫한 Top5 섹션 */}
        <section>
          <SwiperHotItemList isCategoryLoading={isLoading} />
        </section>

        {/* 전체 매물 섹션 */}
        <section>
          <SwiperItemList isCategoryLoading={isLoading} />
        </section>
      </Box>
    </Box>
  );
}
