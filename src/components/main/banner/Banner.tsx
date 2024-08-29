import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import bannerImage1 from '../../../assets/image/banner/banner_image1.jpg';
import bannerImage2 from '../../../assets/image/banner/banner_image2.jpg';
import bannerImage3 from '../../../assets/image/banner/banner_image3.jpg';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import '../../../index.css';
import { Box, Flex, Image } from '@chakra-ui/react';

export default function Banner() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
    >
      <SwiperSlide style={{ height: '380px' }}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'rgba(34,34,34,1)'}
          h={'100%'}
        >
          <Box boxSize={'380px'}>
            <Image src={bannerImage1} alt="banner image1" />
          </Box>
        </Flex>
      </SwiperSlide>
      <SwiperSlide style={{ height: '380px' }}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'rgba(142,147,157,1)'}
          h={'100%'}
        >
          <Box boxSize={'380px'}>
            <Image src={bannerImage2} alt="banner image2" />
          </Box>
        </Flex>
      </SwiperSlide>
      <SwiperSlide style={{ height: '380px' }}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={'rgba(216,223,227,1)'}
          h={'100%'}
        >
          <Box boxSize={'380px'}>
            <Image src={bannerImage3} alt="banner image3" />
          </Box>
        </Flex>
      </SwiperSlide>
      <div className="swiper-button-next mr-5 md:mr-10 text-gray-500"></div>
      <div className="swiper-button-prev ml-5 md:ml-10 text-gray-500"></div>
    </Swiper>
  );
}
