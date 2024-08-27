import Banner from '../components/main/banner/Banner';
import Categories from '../components/main/categories/Categories';
import SwiperItemList from '../components/main/item/SwiperItemList';
import SwiperHotItemList from '../components/main/item/SwiperHotItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import { Box, Flex, Text } from '@chakra-ui/react';
import Input from '../components/main/input/input';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TopButton from '../components/common/button/TopButton';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atom/authAtom';

export default function Home() {
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const [isNoItem, setIsNoItem] = useState(false);
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
      <Categories />
      {isNoItem ? (
        <Flex w={'full'} h="450px" align={'center'} justify={'center'}>
          <Flex direction={'column'} align={'center'} gap={2}>
            <Text
              fontWeight={'bold'}
              fontSize={{ base: '1.1rem', md: '1.4rem' }}
              color={'rgba(60,60,60,1)'}
            >
              {'현재 진행중인 경매가 없습니다.'}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Box minW="345px" px={8} overflowX="hidden">
          {/* 지금 핫한 Top5 섹션 */}
          <Box minW="375px" mt={{ base: '12', sm: '75px' }}>
            <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
                지금 핫한 경매 Top5
              </Text>
            </Flex>
            <SwiperHotItemList />
          </Box>

          {/* 전체 매물 섹션 */}
          <Box minW="375px" mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
            <Flex alignItems="end" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
                전체 경매
              </Text>
              <Flex alignItems={'end'} cursor="pointer" ml={2} color="gray.500">
                <Text fontSize={20}>+</Text>
                <Link to={`/auctions?category=전체`}>
                  <Text>더보기</Text>
                </Link>
              </Flex>
            </Flex>
            <SwiperItemList setIsNoItem={setIsNoItem} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
