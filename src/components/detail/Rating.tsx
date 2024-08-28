import { Flex, Text } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';

export default function Rating({ value = 4 }) {
  return (
    <Flex flex={1} direction={'column'}>
      <Flex alignItems={'center'}>
        <Text fontSize={16} fontWeight={'semibold'}>
          제품 상태
        </Text>
      </Flex>
      <Flex alignItems={'center'}>
        <ReactStars count={5} size={30} activeColor="#ffd700" isHalf={true} value={value} />
        <Text
          fontSize={16}
          fontWeight={'normal'}
          marginLeft={2}
          marginTop={'14px'}
          color={'rgba(150,150,150,1)'}
        >
          ({value}/5)
        </Text>
      </Flex>
    </Flex>
  );
}
