import { Text, Flex, Grid, GridItem, useBreakpointValue, Button, Box } from '@chakra-ui/react';
import ItemCard from '../../main/item/ItemCard';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAuctionItems } from '../../../axios/auction/auctionItems';
import ItemCardSkeleton from '../../../components/common/item/ItemCardSkeleton';

interface ItemListProps {
  setIsNoItem?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ItemList({ setIsNoItem }: ItemListProps) {
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';
  const subCategory = searchParams.get('sub') || undefined;
  const sorted = searchParams.get('sorted') || 'recent';
  const search = searchParams.get('word') || undefined;
  const { ref, inView } = useInView();
  const skeletonArray = new Array(5).fill(null);

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 모바일에서 한 줄에 2개의 아이템
    sm2: 'repeat(2, 1fr)', // 작은 화면에서 한 줄에 2개의 아이템
    lg: 'repeat(3, 1fr)', // 큰 화면에서 한 줄에 3개의 아이템
    '2xl': 'repeat(5, 1fr)', // 초대형 화면에서 한 줄에 5개의 아이템
  });

  const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQuery({
    queryKey: ['items', category, subCategory, sorted, search],
    queryFn: () => getAuctionItems({ word: search, category, sorted, sub: subCategory }),
    getNextPageParam: lastPage => {
      return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (isLoading) return;
    if (data.pages[0].content.length === 0) {
      setIsNoItem(true);
    }
    if (data.pages[0].content.length > 0) {
      setIsNoItem(false);
    }
  }, [data]);

  if (error) {
    return <Box>Fetching error</Box>;
  }

  if (isLoading) {
    return (
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm2: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          '2xl': 'repeat(5, 1fr)',
        }}
        gap={6}
      >
        {skeletonArray.map((item, i) => (
          <GridItem key={i}>
            <ItemCardSkeleton />
          </GridItem>
        ))}
      </Grid>
    );
  }

  return (
    <>
      <Grid templateColumns={gridTemplateColumns} gap={7} position={'relative'} zIndex={'40'}>
        {data.pages.map(page =>
          page.content.map(item => {
            return (
              <GridItem key={item.id}>
                <ItemCard item={item} />
              </GridItem>
            );
          }),
        )}
      </Grid>
      <Box ref={ref} textAlign="center" py={0}></Box>
    </>
  );
}
