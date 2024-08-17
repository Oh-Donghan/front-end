import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import ItemCard from '../main/item/ItemCard';

interface ItemListProps {
  type?: string;
}

export default function ItemList({ type }: ItemListProps) {
  const items = type ? Array(5).fill(<ItemCard />) : Array(10).fill(<ItemCard />);

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 모바일에서 한 줄에 2개의 아이템
    sm2: 'repeat(2, 1fr)', // 작은 화면에서 한 줄에 2개의 아이템
    lg: 'repeat(3, 1fr)', // 큰 화면에서 한 줄에 3개의 아이템
    '2xl': 'repeat(5, 1fr)', // 초대형 화면에서 한 줄에 5개의 아이템
  });

  return (
    <Grid templateColumns={gridTemplateColumns} gap={6} position={'relative'} zIndex={'50'}>
      {items.map((item, index) => (
        <GridItem key={index}>{item}</GridItem>
      ))}
    </Grid>
  );
}
