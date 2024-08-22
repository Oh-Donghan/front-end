import { Box, Button, Flex, Spinner, Text, useBreakpointValue } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';
import ItemList from '../components/listpage/item/ItemList';
import SwiperItemList from '../components/main/item/ItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import SortButton from '../components/listpage/sort/SortButton';
import Input from '../components/listpage/input/input';

import computer from '../assets/image/category/computer.png';

import CategorySortButton from '../components/listpage/sort/CategorySortButton';
import TopButton from '../components/common/button/TopButton';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/category/fetchCategories';
import { useEffect } from 'react';

export default function AuctionList() {
  const location = useLocation();

  const showSearchInputBelow = useBreakpointValue({ base: true, lg: false });

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const subCategory = searchParams.get('sub');
  const sort = searchParams.get('sort');
  const search = searchParams.get('word');

  const { data: categoryData, isLoading } = useQuery({
    queryKey: [category],
    queryFn: () => fetchCategories({ categoryName: category }),
  });

  useEffect(() => {
    console.log(category);
  }, [category]);

  if (isLoading) {
    return (
      <Flex align={'center'} justify={'center'} h={'180px'} pt={4}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box minW="442px" px={8} overflowX="hidden">
      <TopButton />
      <ChatModal />
      {/* 카테고리와 서브카테고리 네비게이션 */}
      <Box pt="30px">
        <Flex alignItems="center" fontSize="14px" color="rgba(90,90,90,1)" pl="6px">
          {search && (
            <>
              <Text>전체 경매</Text>
              <GoChevronRight className="mx-1" />
              <Text>{search}</Text>
            </>
          )}
          {category !== '전체' && !search && (
            <>
              <Text>전체 경매</Text>
              <GoChevronRight className="mx-1" />
              <Text>{categoryData.categoryName}</Text>
              {subCategory && (
                <>
                  <GoChevronRight className="mx-1" />
                  <Text>{subCategory}</Text>
                </>
              )}
            </>
          )}
          {category === '전체' && !search && (
            <>
              <Text>전체 경매</Text>
            </>
          )}
        </Flex>
        {!search && (
          <Flex alignItems={'center'} marginTop={'20px'}>
            <img src={computer} alt="" width={'28px'} height={'28px'} className="ml-1 mb-0.5" />
            <Text fontSize="26px" fontWeight="bold" pl="6px" ml="3px">
              {search ? `'${search}'에 대한 검색 결과` : categoryData.categoryName}
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
              <Text fontSize="26px" fontWeight="bold" pl="6px" ml="3px">
                {search ? `'${search}'에 대한 검색 결과'` : category}
              </Text>
            ) : (
              <Flex>
                <CategorySortButton /> {/* 대분류 변경 핸들러 */}
                {categoryData.categories?.map((sub, i) => (
                  <Link
                    to={{
                      pathname: '/auctions',
                      search: new URLSearchParams({
                        category,
                        sub: sub.categoryName,
                        ...(sort && { sort }), // sort가 있으면 포함
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

      {search ? (
        <>
          {/* 검색된 경매 섹션 */}
          <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '4' }}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb={{ base: '4', sm: '5' }}
            ></Flex>
            <ItemList type="search" />
          </Box>
        </>
      ) : (
        <>
          {/* 지금 핫한 Top5 섹션 */}
          <Box mt={{ base: '12', sm: '60px' }}>
            <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: '1.3rem', md: '1.5rem' }} fontWeight="bold">
                {category !== '전체' ? `지금 핫한 ${category} Top5` : '지금 핫한 Top5'}
              </Text>
            </Flex>
            <SwiperItemList type="hot" />
          </Box>

          {/* 전체 경매 섹션 */}
          <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
            <Flex alignItems="center" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: '1.3rem', md: '1.5rem' }} fontWeight="bold">
                {category !== '전체'
                  ? `전체 ${subCategory === null ? category : subCategory} 경매`
                  : '전체 경매'}
              </Text>
            </Flex>
            <ItemList />
          </Box>
        </>
      )}
    </Box>
  );
}
