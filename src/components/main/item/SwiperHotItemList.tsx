import { Box, Flex, Grid, GridItem, useBreakpointValue, Text } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import { getAuctionHotItems } from '../../../axios/auction/auctionItems';
import { useQuery } from '@tanstack/react-query';
import ItemCardSkeleton from '../../common/item/ItemCardSkeleton';

export default function SwiperHotItemList() {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('mainCategory') || '전체';
  const subCategory = searchParams.get('subCategory') || undefined;
  const skeletonArray = new Array(5).fill(null);

  const { data, isLoading } = useQuery({
    queryKey: ['items', category, 'top5'],
    queryFn: () => getAuctionHotItems({ category, subCategory }),
  });

  if (isLoading) {
    return (
      <Box minW="375px" mt={'100px'}>
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
      </Box>
    );
  }

  return isSlider ? (
    <>
      {data?.length === 0 ? null : (
        <Box minW="375px" mt={{ base: 12, sm: '75px' }}>
          <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
            <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
              {`지금 핫한 ${subCategory ? subCategory : category !== '전체' ? category : '경매'} Top5`}
            </Text>
          </Flex>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[EffectCards, Pagination]}
            className="mySwiper"
            style={{ marginTop: '25px' }}
          >
            {data?.map((item, i) => (
              <SwiperSlide key={item.id}>
                <ItemCard type={'hot'} item={item} rank={i + 1} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  ) : (
    <>
      {data?.length === 0 ? null : (
        <Box minW="375px" mt={{ base: 12, sm: '75px' }}>
          <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
            <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
              {`지금 핫한 ${subCategory ? subCategory : category !== '전체' ? category : '경매'} Top5`}
            </Text>
          </Flex>
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm2: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              '2xl': 'repeat(5, 1fr)',
            }}
            gap={6}
          >
            {data?.map((item, i) => (
              <GridItem key={item.id}>
                <ItemCard type={'hot'} item={item} rank={i + 1} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
