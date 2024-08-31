import { Box, Flex, Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';
import ItemCard from './ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import { getAuctionItems } from '../../../axios/auction/auctionItems';
import { useQuery } from '@tanstack/react-query';
import ItemCardSkeleton from '../../common/item/ItemCardSkeleton';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auctionState } from '../../../recoil/atom/auctionPriceAtom';

interface SwiperHotItemListProps {
  isCategoryLoading?: boolean;
}

export default function SwiperItemList({ isCategoryLoading }: SwiperHotItemListProps) {
  const isSlider = useBreakpointValue({ base: true, sm2: false, md: false });
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';
  const skeletonArray = new Array(5).fill(null);
  const auctionArray = useRecoilValue(auctionState);

  const { data, isLoading } = useQuery({
    queryKey: ['items', category],
    queryFn: () =>
      getAuctionItems({ word: undefined, category, sorted: undefined, subCategory: undefined }),
    staleTime: 3 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isCategoryLoading || isLoading) {
    return (
      <Box minW="375px" mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
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

  return isSlider ? (
    <>
      {data?.content.length === 0 ? null : (
        <Box minW="375px" mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
          <Flex alignItems="end" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
            <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
              전체 경매
            </Text>
            <Flex alignItems={'end'} cursor="pointer" ml={2} color="gray.500">
              <Text fontSize={20}>+</Text>
              <Link to={`/auctions?category=전체`}>
                <Text>더보기</Text>
              </Link>
            </Flex>
          </Flex>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[EffectCards, Pagination]}
            className="mySwiper"
            style={{ marginTop: '25px' }}
          >
            {data?.content.map(item => (
              <SwiperSlide key={item.id}>
                <ItemCard item={item} auctionArray={auctionArray} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  ) : (
    <>
      {data?.content.length === 0 ? null : (
        <Box minW="375px" mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
          <Flex alignItems="end" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
            <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
              전체 경매
            </Text>
            <Flex alignItems={'end'} cursor="pointer" ml={2} color="gray.500">
              <Text fontSize={20}>+</Text>
              <Link to={`/auctions?category=전체`}>
                <Text>더보기</Text>
              </Link>
            </Flex>
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
            {data?.content.map(item => (
              <GridItem key={item.id}>
                <ItemCard item={item} auctionArray={auctionArray} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
