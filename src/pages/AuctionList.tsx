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

export default function AuctionList() {
  const location = useLocation();

  const showSearchInputBelow = useBreakpointValue({ base: true, lg: false }, { fallback: 'lg' });

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

  // const renderNoItemsMessage = () => (
  //   <Flex w={'full'} h="668px" align={'center'} justify={'center'}>
  //     <Flex direction={'column'} align={'center'} gap={2}>
  //       <Text
  //         fontWeight={'bold'}
  //         fontSize={{ base: '1.1rem', md: '1.4rem' }}
  //         color={'rgba(60,60,60,1)'}
  //       >
  //         {'현재 진행중인 경매가 없습니다.'}
  //       </Text>
  //       <Link to={'/'}>
  //         <Button
  //           color={'white'}
  //           bgColor={'rgba(49, 130, 206,1)'}
  //           _hover={{ bgColor: 'rgba(49, 120, 170,1)' }}
  //           mt={8}
  //         >
  //           홈으로 이동
  //         </Button>
  //       </Link>
  //     </Flex>
  //   </Flex>
  // );

  const renderItemList = () => (
    <>
      {search ? (
        <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '6' }}>
          <ItemList />
        </Box>
      ) : (
        <>
          {/* 지금 핫한 Top5 섹션 */}
          <Box mt={{ base: '12', sm: '60px' }}>
            <SwiperHotItemList />
          </Box>

          {/* 전체 매물 섹션 */}
          <section>
            <ItemList />
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
            {search ? (
              <Flex align={'center'}>
                <img
                  src={searchico}
                  alt="검색 아이콘"
                  width={'28px'}
                  height={'28px'}
                  className="ml-1 mr-3 mb-0.5 mt-1.5"
                />
                <Text fontSize="26px" fontWeight="bold" ml="3px" mt={'4px'}>
                  {`${search}'에 대한 검색 결과`}
                </Text>
              </Flex>
            ) : (
              <Flex>
                <CategorySortButton /> {/* 대분류 변경 핸들러 */}
                {category !== '전체' && (
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
                {currentCategoryData?.categories?.map((sub, i) => (
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
            )}

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
