import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

interface ItemListProps {
  type?: string;
}

export default function ItemList({ type }: ItemListProps) {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const items = type ? Array(5).fill(<ItemCard />) : Array(10).fill(<ItemCard />);

  return isSlider ? (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      loop={true}
      className="mySwiper"
      style={{ marginTop: '25px' }}
    >
      {items.map((item, index) => (
        <SwiperSlide style={{ padding: '0px 65px 0px 65px' }} key={index}>
          {item}
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
      position={'relative'}
      zIndex={'50'}
    >
      {items.map((item, index) => (
        <GridItem key={index}>{item}</GridItem>
      ))}
    </Grid>
  );
}
