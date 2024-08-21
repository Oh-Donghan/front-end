import { Text, Flex, Grid, GridItem, useBreakpointValue, Button, Box } from '@chakra-ui/react';
import ItemCard from '../../main/item/ItemCard';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axios from 'axios';

interface AuctionItem {
  id: number;
  title: string;
  productName: string;
  productStatus: number;
  receiveType: string;
  deliveryType: string;
  currentPrice: number;
  instantPrice: number;
  memberCount: number;
  endedAt: string;
  childCategory: {
    id: number;
    categoryName: string;
    parentId: number;
    createdAt: string;
  };
  imageList: Array<{
    id: number;
    imageUrl: string;
    imageName: string;
    imageType: string;
    auctionId: number;
    createdAt: string;
  }>;
}

interface ItemListProps {
  type?: string;
  data?: AuctionItem[];
}

const fetchItems = async ({ pageParam = 0 }) => {
  const res = await axios.get(`https://fake-server.com/api/auctions`, {
    params: {
      page: pageParam,
    },
  });
  return res.data;
};

export default function ItemList({ type }: ItemListProps) {
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';
  const subCategory = searchParams.get('sub');
  const sort = searchParams.get('sort');
  const search = searchParams.get('word');
  const { ref, inView } = useInView();

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 모바일에서 한 줄에 2개의 아이템
    sm2: 'repeat(2, 1fr)', // 작은 화면에서 한 줄에 2개의 아이템
    lg: 'repeat(3, 1fr)', // 큰 화면에서 한 줄에 3개의 아이템
    '2xl': 'repeat(5, 1fr)', // 초대형 화면에서 한 줄에 5개의 아이템
  });

  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ['items', category, subCategory, sort, search],
    queryFn: fetchItems,
    getNextPageParam: lastPage => {
      return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    console.log(inView);

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    console.log(data?.pages);
  }, [data]);

  if (isPending) {
    {
      /* 스켈레톤 추가 */
    }
    return <div>loading..</div>;
  }

  return (
    <>
      {data.pages.length > 0 ? (
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
      ) : (
        <Flex w={'full'} h="400px" align={'center'} justify={'center'}>
          <Flex direction={'column'} align={'center'} gap={2}>
            <Text fontWeight={'bold'} fontSize={{ base: '1.1rem', md: '1.4rem' }}>
              {type === 'search'
                ? '키워드가 포함된 경매을 찾을 수 없습니다.'
                : '현재 진행중인 경매가 없습니다.'}
            </Text>
            <Text fontWeight={'bold'} fontSize={'1rem'} color={'rgba(140,140,140,1)'}>
              {type === 'search' ? '검색어를 바르게 입력했는지 확인해 보세요' : ''}
            </Text>
            <Link to={'/'} className="mt-8">
              <Button
                color={'white'}
                bgColor={'rgba(49, 130, 206,1)'}
                _hover={{ bgColor: 'rgba(49, 120, 170,1)' }}
              >
                홈으로 이동
              </Button>
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
}
