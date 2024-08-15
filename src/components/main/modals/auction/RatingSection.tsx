import { Flex, Text } from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';

interface RatingSectionProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

export default function RatingSection({ rating, onRatingChange }: RatingSectionProps) {
  return (
    <Flex flex={1} direction={'column'}>
      <Flex alignItems={'center'}>
        <Text fontSize={16} fontWeight={'semibold'}>
          상태
        </Text>
        <Text fontSize={14} color={'red'} marginLeft={1}>
          *필수
        </Text>
      </Flex>
      <Flex alignItems={'center'}>
        <ReactStars
          count={5}
          onChange={onRatingChange}
          size={30}
          activeColor="#ffd700"
          isHalf={true}
        />
        <Text
          fontSize={16}
          fontWeight={'normal'}
          marginLeft={2}
          marginTop={'14px'}
          color={'rgba(150,150,150,1)'}
        >
          ({rating}/5)
        </Text>
      </Flex>
    </Flex>
  );
}
