import { Box, VStack, Image, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { IDetailImage } from '../../axios/auctionDetail/auctionDetail';

interface AuctionImagesProps {
  imageList: IDetailImage[];
}

const AuctionImages: React.FC<AuctionImagesProps> = ({ imageList = [] }) => {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // imageList가 업데이트되면 thumbnailImage를 다시 설정
    const thumbnailImage = imageList.find(image => image.imageType === 'THUMBNAIL')?.imageUrl || '';
    setMainImage(thumbnailImage);
  }, [imageList]);

  const handleSelectImage = (imageURL: string) => {
    setMainImage(imageURL);
  };

  return (
    <Flex direction="column" w={{ base: '100%', md: '40%' }} flex={1}>
      <VStack spacing={2} w="100%">
        {/* Main Image */}
        <Box w="100%" h="full" minH="480px">
          <Image src={mainImage} alt="Main Image" objectFit="cover" w="100%" h="100%" />
        </Box>

        <Swiper
          spaceBetween={5}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{ width: '100%', height: '100px' }}
        >
          {imageList.map(image => (
            <SwiperSlide key={image.id} onClick={() => handleSelectImage(image.imageUrl)}>
              <Box
                w="100%"
                h="100%"
                bg="gray.300"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
              >
                <Image
                  src={image.imageUrl}
                  alt={`Image ${image.imageType}`}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </VStack>
    </Flex>
  );
};

export default AuctionImages;
