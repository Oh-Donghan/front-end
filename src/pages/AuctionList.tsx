import { Box, Button, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';
import ItemList from '../components/listpage/item/ItemList';
import SwiperHotItemList from '../components/main/item/SwiperHotItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import SortButton from '../components/listpage/sort/SortButton';
import Input from '../components/listpage/input/input';
import all from '../assets/image/category/all.png';
import searchico from '../assets/image/common/search.png';
import CategorySortButton from '../components/listpage/sort/CategorySortButton';
import TopButton from '../components/common/button/TopButton';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../axios/category/categories';
import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { auctionState } from '../recoil/atom/auctionPriceAtom';
import { useRecoilState } from 'recoil';

export default function AuctionList() {
  const location = useLocation();

  const showSearchInputBelow = useBreakpointValue({ base: true, lg: false }, { fallback: 'lg' });
  const [auctionArray, setAuctionArray] = useRecoilState(auctionState);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('mainCategory') || '전체';
  const subCategory = searchParams.get('subCategory') || undefined;
  const sort = searchParams.get('sorted') || 'recent';
  const search = searchParams.get('word') || undefined;

  // 메인 페이지에서 캐싱한 카테고리 데이터 사용
  // url을 직접 수정해서 들어오는 경우도 고려해서 queryClient.getQueryData(['categories'])는 사용하지 않음
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const currentCategoryData = categories?.find(cat => {
    return cat.categoryName === category;
  });

  // 페이지 첫 로드시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    console.log('log:', JSON.stringify(auctionArray, null, 2));
  }, [auctionArray]);

  const renderItemList = () => (
    <>
      {search ? (
        <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '6' }}>
          <ItemList isCategoryLoading={isLoading} />
        </Box>
      ) : (
        <>
          {/* 지금 핫한 Top5 섹션 */}
          <Box mt={{ base: '12', sm: '60px' }}>
            <SwiperHotItemList isCategoryLoading={isLoading} />
          </Box>

          {/* 전체 매물 섹션 */}
          <section>
            <ItemList isCategoryLoading={isLoading} />
          </section>
        </>
      )}
    </>
  );

  return (
    <Box minW="442px" px={8} overflowX="hidden">
      <TopButton />
      <ChatModal />
      {/* 카테고리와 서브카테고리 네비게이션 */}
      <Box pt="30px">
        <Flex alignItems="center" fontSize="14px" color="rgba(90,90,90,1)" pl="6px">
          {/*검색 키워드가 있을 때*/}
          {search && (
            <>
              <Text>전체 경매</Text>
              <GoChevronRight className="mx-1" />
              <Text>{search}</Text>
            </>
          )}
          {/*검색 키워드가 없고 카테고리가 전체가 아닐 때*/}
          {category !== '전체' && !search && (
            <>
              <Text>전체 경매</Text>
              <GoChevronRight className="mx-1" />
              <Text>{currentCategoryData?.categoryName}</Text>
              {subCategory && (
                <>
                  <GoChevronRight className="mx-1" />
                  <Text>{subCategory}</Text>
                </>
              )}
            </>
          )}
          {/*검색 키워드가 없고 카테고리가 전체일 때*/}
          {category === '전체' && !search && (
            <>
              <Text>전체 경매</Text>
            </>
          )}
        </Flex>
        {/*검색 키워드가 없고 카테고리가 전체가 아닐 때 타이틀*/}
        {isLoading ? (
          <>
            <Flex align={'center'} mt={'20px'}>
              <Box borderRadius={'50%'} w={'40px'} h={'40px'} bgColor={'rgba(230,230,230,1)'}></Box>
              <Box w={'44px'} h={'12px'} bgColor={'rgba(230,230,230,1)'} ml={3}></Box>
            </Flex>
          </>
        ) : (
          <>
            {/*카테고리를 선택하고 검색은 하지 않았을 떄*/}
            {category !== '전체' && !search && (
              <Flex alignItems={'center'} marginTop={'20px'}>
                <img
                  src={currentCategoryData?.imageUrl}
                  alt="all.png"
                  width={'28px'}
                  height={'28px'}
                  className="ml-1 mb-0.5"
                />
                <Text fontSize="26px" fontWeight="bold" pl="6px" ml="3px">
                  {currentCategoryData?.categoryName}
                </Text>
              </Flex>
            )}
            {/*카테고리를 선택하고 검색을 했을 떄*/}
            {category !== '전체' && search && (
              <Flex align={'center'} mt={4}>
                <img
                  src={searchico}
                  alt="검색 아이콘"
                  width={'28px'}
                  height={'28px'}
                  className="ml-1 mr-3 mb-0.5 mt-1.5"
                />
                <Text fontSize={{ base: '20px', md: '26px' }} fontWeight="bold" ml="3px" mt={'4px'}>
                  {`'${search}' 에 대한 검색 결과`}
                </Text>
              </Flex>
            )}
          </>
        )}

        {/*검색 키워드가 없고 카테고리가 전체일 때 타이틀*/}
        {category === '전체' && !search && (
          <Flex alignItems={'center'} marginTop={'20px'}>
            <img
              src={all}
              alt="전체 아이콘"
              width={'28px'}
              height={'28px'}
              className="ml-1 mb-0.5"
            />
            <Text fontSize="26px" fontWeight="bold" pl="6px" ml="3px">
              {'전체'}
            </Text>
          </Flex>
        )}

        {/* 반응형 서브카테고리 및 기타 요소 네비게이션 */}
        <Flex
          mt="16px"
          fontSize="16px"
          overflowX="auto"
          whiteSpace="nowrap"
          alignItems="center"
          css={{
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#E2E8F0',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F7FAFC',
            },
          }}
        >
          <Flex alignItems="center" justifyContent={'space-between'} width={'full'}>
            <Flex>
              <CategorySortButton /> {/* 대분류 변경 핸들러 */}
              {category !== '전체' && category !== '기타' && (
                <Link
                  to={{
                    pathname: '/auctions',
                    search: new URLSearchParams({
                      mainCategory: category,
                      ...(sort !== 'recent' && { sort }), // sort가 있으면 포함
                    }).toString(),
                  }}
                  className="mr-2"
                >
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    variant={!subCategory ? 'solid' : 'outline'}
                    colorScheme={!subCategory ? 'blue' : 'gray'}
                    leftIcon={!subCategory ? <FaCheck /> : null}
                    borderColor={'rgba(210,210,210,1)'}
                  >
                    {'전체'}
                  </Button>
                </Link>
              )}
              {currentCategoryData !== '기타' &&
                currentCategoryData?.categories?.map((sub, i) => (
                  <Link
                    to={{
                      pathname: '/auctions',
                      search: new URLSearchParams({
                        mainCategory: category,
                        subCategory: sub.categoryName,
                        ...(sort !== 'recent' && { sort }), // sort가 있으면 포함
                      }).toString(),
                    }}
                    key={i}
                    className="mr-2"
                  >
                    <Button
                      size={{ base: 'xs', sm: 'sm' }}
                      variant={sub.categoryName === subCategory ? 'solid' : 'outline'}
                      colorScheme={sub.categoryName === subCategory ? 'blue' : 'gray'}
                      leftIcon={sub.categoryName === subCategory ? <FaCheck /> : null}
                      borderColor={'rgba(210,210,210,1)'}
                    >
                      {sub.categoryName}
                    </Button>
                  </Link>
                ))}
            </Flex>

            <Flex>
              {!showSearchInputBelow && (
                <Box display={{ base: 'none', lg: 'block' }} ml={2}>
                  <Input />
                </Box>
              )}

              <Flex cursor="pointer" ml={2} color="gray.500">
                <SortButton />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* 너비가 좁아질 때 아래에 Input이 나타나도록 구현 */}
      {showSearchInputBelow && (
        <Box mb={{ base: '4', sm: '5' }} mt={'5'}>
          <Input />
        </Box>
      )}

      {/* 아이템 목록 렌더링 */}
      {renderItemList()}
    </Box>
  );
}
