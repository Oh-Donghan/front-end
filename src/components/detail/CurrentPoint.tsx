import { useQuery } from '@tanstack/react-query';
import { Text, Box, Flex } from '@chakra-ui/react';
import { fetchCurrentPoint } from '../../axios/auctionDetail/currentPoint';
import { formatPrice } from '../../utils/formatPrice';

const CurrentPoint = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['points'],
    queryFn: fetchCurrentPoint,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <Flex gap={2} alignItems="center">
        <Text color="gray.600">사용 가능 포인트:</Text>
        <Text color="#3182ce" fontWeight="bold" fontSize="md">
          로그인후 확인 가능합니다.
        </Text>
      </Flex>
    );
  }

  // 데이터가 정상적으로 로드된 경우
  return (
    <Flex gap={2} alignItems="center">
      <Text color="gray.600">사용 가능 포인트:</Text>
      <Text color="#3182ce" fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }}>
        {formatPrice(data?.pointAmount)}P
      </Text>
    </Flex>
  );
};

export default CurrentPoint;
