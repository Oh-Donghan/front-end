import {
  Flex,
  Spinner,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { fetchBidData } from '../../../axios/mypage/bid';
import { formatPrice } from '../../../utils/formatPrice';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { formatDate } from '../../../utils/dateFormat';

export default function MyInfoTable() {
  const { ref, inView } = useInView();
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['bidList'],
    queryFn: ({ pageParam = 0 }) => fetchBidData({ page: pageParam, size: pageSize }),
    getNextPageParam: lastPage => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // console.log('bidList:', data);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    data && (
      <Box
        overflowY="scroll"
        h="full"
        maxH={{ base: '72', sm: 'full' }}
        p={2}
        borderRadius="lg"
        boxShadow="lg"
      >
        <TableContainer>
          {data.pages[0].content.length > 0 ? (
            <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
              <Thead>
                <Tr>
                  <Th>
                    <Text fontSize="md">경매 이름</Text>
                  </Th>
                  <Th>
                    <Text fontSize="md">입찰 시간</Text>
                  </Th>
                  <Th isNumeric>
                    <Text fontSize="md">입찰가</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.pages.map(bidItem =>
                  bidItem.content.map(item => (
                    <Tr key={item.id}>
                      <Td>{item.auctionTitle}</Td>
                      <Td>{formatDate(item?.createdAt)}</Td>
                      <Td isNumeric>{formatPrice(item?.bidPrice)}P</Td>
                    </Tr>
                  )),
                )}
              </Tbody>
            </Table>
          ) : (
            '입찰 내역이 없습니다.'
          )}
          <Text ref={ref} textAlign="center" py={0}></Text>
        </TableContainer>
      </Box>
    )
  );
}
