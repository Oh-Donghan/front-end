import Banner from '../components/main/banner/Banner';
import Categories from '../components/main/categories/Categories';
import SwiperItemList from '../components/main/item/SwiperItemList';
import SwiperHotItemList from '../components/main/item/SwiperHotItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import { Box } from '@chakra-ui/react';
import Input from '../components/main/input/input';
import { useLocation, useNavigate } from 'react-router-dom';
import TopButton from '../components/common/button/TopButton';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atom/authAtom';
import { getCategories } from '../axios/category/categories';
import { useQuery } from '@tanstack/react-query';
import { Client } from '@stomp/stompjs';
import { auctionState } from '../recoil/atom/auctionPriceAtom';
import { eventSourceState } from '../recoil/atom/eventSourceAtom';
import { alarmState, isNewNotificationState } from '../recoil/atom/alarmAtom';

export default function Home() {
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const setAlarmState = useSetRecoilState(alarmState);
  const [, setAuctionArray] = useRecoilState(auctionState);
  const [, setIsNewNotification] = useRecoilState(isNewNotificationState);

  // 소셜 로그인 후 redirect 주소에 있는 accessToken recoil에 저장
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const memberId = queryParams.get('memberId');
    const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

    if (accessToken && memberId) {
      setIsProcessingAuth(true);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      console.log('Access Token saved:', accessToken);

      localStorage.setItem('memberId', memberId);
      console.log('Member ID saved:', memberId);

      // 알림 SSE 연결 요청
      if (eventSource) {
        console.log('Unsubscribed from notifications');
        eventSource.close();
        setEventSource(null);
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
      };

      // SSE 연결을 fetch로 구현
      const sseConnect = async (url, headers) => {
        try {
          const response = await fetch(url, {
            headers,
            method: 'GET',
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let buffer = '';

          // 새로운 EventSource 객체 생성
          const newEventSource = {
            close: () => {
              reader.cancel(); // SSE 연결을 수동으로 해제
            },
          };

          setEventSource(newEventSource);

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data:')) {
                const eventDataString = line.replace(/^data:\s*/, '');
                try {
                  const eventData = JSON.parse(eventDataString); // JSON 문자열을 객체로 변환
                  console.log('New message:', eventData);
                  setAlarmState(prev => [eventData, ...prev]);
                  localStorage.setItem(`last-event-id-${memberId}`, eventData.id.toString()); // id 값을 로컬 스토리지에 저장
                  setIsNewNotification(true); // 새로운 알림 도착 시 상태 업데이트
                } catch (error) {
                  console.error('Failed to parse event data:', error);
                }
              }
            }
          }
        } catch (err) {
          console.error('SSE connection failed:', err);
        }
      };

      sseConnect('https://dddang.store/api/members/notification/subscribe', headers);

      console.log('Subscribed to notifications');

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
