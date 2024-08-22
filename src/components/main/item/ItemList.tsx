import { Grid, GridItem, useBreakpointValue, Text } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import { fetchItems } from '../../../api/auction/fetchAuctionItems';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ItemListProps {
  type?: string;
}

export default function SwiperItemList({ type }: ItemListProps) {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';

  const { data: items, isLoading } = useQuery({
    queryKey: ['items', category, type],
    queryFn: () => fetchItems({ type }),
  });

  useEffect(() => {
    console.log(items);
  }, [items]);

  if (isLoading) {
    return <Text>loding...</Text>;
  }

  return isSlider ? (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      pagination={{ clickable: true }}
      modules={[EffectCards, Pagination]}
      className="mySwiper"
      style={{ marginTop: '25px' }}
    >
      {items.content.map((item, i) => (
        <SwiperSlide key={item.id}>
          <ItemCard type={type} item={item} rank={i + 1} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        sm2: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}
      gap={6}
    >
      {items.content.map((item, i) => (
        <GridItem key={item.id}>
          <ItemCard type={type} item={item} rank={i + 1} />
        </GridItem>
      ))}
    </Grid>
  );
}
