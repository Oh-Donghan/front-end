import { Text, Flex, Grid, GridItem, useBreakpointValue, Button } from '@chakra-ui/react';
import ItemCard from '../main/item/ItemCard';
import { Link } from 'react-router-dom';

interface ItemListProps {
  type?: string;
}

export default function ItemList({ type }: ItemListProps) {
  const items =
    type === 'hot'
      ? Array(5).fill(<ItemCard />)
      : type === 'search'
        ? Array(0).fill(<ItemCard />)
        : Array(10).fill(<ItemCard />);

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 모바일에서 한 줄에 2개의 아이템
    sm2: 'repeat(2, 1fr)', // 작은 화면에서 한 줄에 2개의 아이템
    lg: 'repeat(3, 1fr)', // 큰 화면에서 한 줄에 3개의 아이템
    '2xl': 'repeat(5, 1fr)', // 초대형 화면에서 한 줄에 5개의 아이템
  });

  return (
    <>
      {items.length > 0 ? (
        <Grid templateColumns={gridTemplateColumns} gap={6} position={'relative'} zIndex={'40'}>
          {items.map((item, index) => (
            <GridItem key={index}>{item}</GridItem>
          ))}
        </Grid>
      ) : (
        <Flex w={'full'} h="400px" align={'center'} justify={'center'}>
          <Flex direction={'column'} align={'center'} gap={2}>
            <Text fontWeight={'bold'} fontSize={'1.4rem'}>
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
