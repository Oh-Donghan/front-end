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
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atom/authAtom';
import { getCategories } from '../axios/category/categories';
import { useQuery } from '@tanstack/react-query';
import { Client } from '@stomp/stompjs';

export default function Home() {
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const memberId = queryParams.get('memberId');

    if (accessToken && memberId) {
      setIsProcessingAuth(true);

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      console.log('Access Token saved:', accessToken);

      localStorage.setItem('memberId', memberId);
      console.log('Member ID saved:', memberId);

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
