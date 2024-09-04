import { Flex, Text } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';

export default function Rating({ rate }) {
  if (rate === undefined || rate === null) {
    return null; // 또는 로딩 스피너를 반환할 수 있습니다.
  }

  return (
    <Flex flex={1} direction={'column'}>
      <Flex alignItems={'center'}>
        <Text fontSize={16} fontWeight={'semibold'}>
          제품 상태
        </Text>
      </Flex>
      <Flex alignItems="flex-start">
        <ReactStars
          count={5}
          size={28}
          activeColor="#ffd700"
          isHalf={true}
          value={rate}
          edit={false}
        />
        <Text
          fontSize={16}
          fontWeight={'normal'}
          marginLeft={1}
          marginTop={'14px'}
          color={'rgba(150,150,150,1)'}
        >
          ({rate}/5)
        </Text>
      </Flex>
    </Flex>
  );
}
