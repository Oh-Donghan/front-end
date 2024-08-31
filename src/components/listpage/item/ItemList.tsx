import { Grid, GridItem, useBreakpointValue, Box, Flex, Text, Button } from '@chakra-ui/react';
import ItemCard from '../../main/item/ItemCard';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAuctionItems } from '../../../axios/auction/auctionItems';
import ItemCardSkeleton from '../../../components/common/item/ItemCardSkeleton';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auctionState } from '../../../recoil/atom/auctionPriceAtom';
import { useRecoilValue } from 'recoil';

interface SwiperHotItemListProps {
  isCategoryLoading?: boolean;
}

export default function ItemList({ isCategoryLoading }: SwiperHotItemListProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('mainCategory') || '전체';
  const subCategory = searchParams.get('subCategory') || undefined;
  const sorted = searchParams.get('sorted') || 'recent';
  const search = searchParams.get('word') || undefined;
  const { ref, inView } = useInView();
  const skeletonArray = new Array(10).fill(null);
  const auctionArray = useRecoilValue(auctionState);

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 모바일에서 한 줄에 2개의 아이템
    sm2: 'repeat(2, 1fr)', // 작은 화면에서 한 줄에 2개의 아이템
    lg: 'repeat(3, 1fr)', // 큰 화면에서 한 줄에 3개의 아이템
    '2xl': 'repeat(5, 1fr)', // 초대형 화면에서 한 줄에 5개의 아이템
  });

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['items', category, subCategory, sorted, search],
    queryFn: ({ pageParam = 0 }) =>
      getAuctionItems({ word: search, category, sorted, subCategory, page: pageParam }),
    getNextPageParam: lastPage => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isCategoryLoading || isLoading) {
    return (
      <Box minW="375px" mt={'85px'}>
        <Box w={'160px'} h={'35px'} bgColor={'rgba(230,230,230,1)'} mb={'30px'}></Box>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm2: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            '2xl': 'repeat(5, 1fr)',
          }}
          gap={6}
        >
          {skeletonArray.map((_, i) => (
            <GridItem key={i}>
              <ItemCardSkeleton />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <>
      <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
        {data.pages[0].content.length === 0 ? (
          <Flex direction={'column'} justify={'center'} align={'center'} gap={2} height={'500px'}>
            <Text
              fontWeight={'bold'}
              fontSize={{ base: '1.1rem', md: '1.4rem' }}
              color={'rgba(60,60,60,1)'}
            >
              {'현재 진행중인 경매가 없습니다.'}
            </Text>
            <Link to={'/'}>
              <Button
                color={'white'}
                bgColor={'rgba(49, 130, 206,1)'}
                _hover={{ bgColor: 'rgba(49, 120, 170,1)' }}
                mt={8}
              >
                홈으로 이동
              </Button>
            </Link>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: '1.3rem', md: '1.5rem' }} fontWeight="bold">
                {category !== '전체'
                  ? `전체 ${subCategory === undefined ? category : subCategory} 경매`
                  : '전체 경매'}
              </Text>
            </Flex>
            <Grid templateColumns={gridTemplateColumns} gap={7} position={'relative'} zIndex={'40'}>
              {data.pages.map(page =>
                page.content.map(item => {
                  return (
                    <GridItem key={item.id}>
                      <ItemCard item={item} auctionArray={auctionArray} />
                    </GridItem>
                  );
                }),
              )}
            </Grid>
            <Box ref={ref} textAlign="center" py={0}></Box>
          </>
        )}
      </Box>
    </>
  );
}
