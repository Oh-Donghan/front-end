import { useQuery } from '@tanstack/react-query';
import { Text, Box } from '@chakra-ui/react';
import { fetchCurrentPoint } from '../../axios/auctionDetail/currentPoint';

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
    return <Box>포인트 정보를 불러오는데 실패했습니다.</Box>;
  }

  // 데이터가 정상적으로 로드된 경우
  return (
    <Text color="gray.600" fontSize={{ base: 'lg', md: 'xl' }}>
      사용 가능 포인트: {data?.pointAmount}P
    </Text>
  );
};

export default CurrentPoint;
