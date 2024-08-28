import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import { getAuctionItems } from '../../../axios/auction/auctionItems';
import { useQuery } from '@tanstack/react-query';
import ItemCardSkeleton from '../../common/item/ItemCardSkeleton';
import { useEffect } from 'react';

interface ItemListProps {
  type?: string;
  setIsNoItem?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SwiperItemList({ type, setIsNoItem }: ItemListProps) {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';
  const skeletonArray = new Array(5).fill(null);

  const { data, isLoading } = useQuery({
    queryKey: ['items', category],
    queryFn: () =>
      getAuctionItems({ word: undefined, category, sorted: undefined, sub: undefined }),
  });

  useEffect(() => {
    if (isLoading) return;
    if (!type && data.content.length === 0) {
      setIsNoItem(true);
    }
    if (!type && data.content.length > 0) {
      setIsNoItem(false);
    }

    if (data) {
      console.log(data);
    }
  }, [data]);

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

  if (!data || !data.content || data.content.length === 0) {
    return <div>No items found</div>;
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
      {data.content.map(item => (
        <SwiperSlide key={item.id}>
          <ItemCard item={item} />
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
      {data.content.map(item => (
        <GridItem key={item.id}>
          <ItemCard item={item} />
        </GridItem>
      ))}
    </Grid>
  );
}
