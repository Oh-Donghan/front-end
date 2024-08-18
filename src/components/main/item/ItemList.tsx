import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';

interface ItemListProps {
  type?: string;
}

export default function SwiperItemList({ type }: ItemListProps) {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const items = type
    ? Array(5)
        .fill(0)
        .map((_, i) => <ItemCard rank={i + 1} />)
    : Array(10).fill(<ItemCard />);

  return isSlider ? (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      pagination={{ clickable: true }}
      modules={[EffectCards, Pagination]}
      className="mySwiper"
      style={{ marginTop: '25px' }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
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
      {items.map((item, index) => (
        <GridItem key={index}>{item}</GridItem>
      ))}
    </Grid>
  );
}
