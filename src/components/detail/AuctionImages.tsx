import { Box, VStack, Image, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';

const imageList = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
  'https://example.com/image6.jpg',
];

const AuctionImages = () => {
  const [mainImage, setMainImage] = useState(imageList[0]);

  const handleSelectImage = (imageURL: string) => {
    setMainImage(imageURL);
  };

  return (
    <Flex direction="column" w={{ base: '100%', md: '40%' }} flex={1}>
      <VStack spacing={2} w="100%">
        {/* Main Image */}
        <Box w="100%" bg="gray.600" h="full" minH="480px">
          <Image src={mainImage} alt="Main Image" objectFit="cover" w="100%" h="100%" />
        </Box>

        <Swiper
          spaceBetween={5}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{ width: '100%' }}
        >
          {imageList.map((imageURL, idx) => (
            <SwiperSlide key={idx} onClick={() => handleSelectImage(imageURL)}>
              <Box
                w="full"
                h="100px"
                bg="gray.300"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
              >
                <Image src={`image_url_${imageURL}`} alt={`Image ${imageURL}`} objectFit="cover" />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </VStack>
    </Flex>
  );
};

export default AuctionImages;
