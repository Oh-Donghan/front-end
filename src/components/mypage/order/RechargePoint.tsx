import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentPoint } from '../../../axios/auctionDetail/currentPoint';
import { formatPrice } from '../../../utils/formatPrice';

export default function RechargePoint() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['points'],
    queryFn: fetchCurrentPoint,
  });

  console.log(data);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Flex
      justifyContent={'end'}
      alignItems={'end'}
      gap={4}
      marginRight={'24px'}
      marginBottom={'8px'}
    >
      <Text fontSize={{ base: 'sm', md: 'xl' }}>보유 포인트</Text>
      <Box fontSize={{ base: 'lg', md: '3xl' }}>{formatPrice(data?.pointAmount)}P</Box>
    </Flex>
  );
}
