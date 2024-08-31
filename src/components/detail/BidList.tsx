import { Box, List, ListItem, Flex, Text, Icon } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaUserCheck } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { fetchAuctionDetailData } from '../../axios/auctionDetail/auctionDetail';
import maskUserId from '../../utils/maskUserId';
import { formatPrice } from '../../utils/formatPrice';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

const BidList = ({ auctionId }) => {
  const queryClient = useQueryClient();
  const stompClientRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', auctionId],
    queryFn: () => fetchAuctionDetailData(auctionId),
  });

  // 소켓 구독 후 입찰 정보가 바뀌면 표시
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'wss://dddang.store/auction-websocket',
      reconnectDelay: 2000,
    });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/sub/auction/${auctionId}`, () => {
        // 새로운 입찰 정보가 들어오면 쿼리를 무효화하여 데이터를 새로고침
        queryClient.invalidateQueries({ queryKey: ['detail', auctionId] });
      });
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [auctionId, queryClient]);

  if (isLoading) {
    return <div>Data Loading...</div>;
  }

  if (isError) {
    return <div>fetch Error...</div>;
  }

  return (
    <Box mt={8} flex={1}>
      <List spacing={4}>
        {data.bidList.slice(0, 5).map(bid => (
          <ListItem key={bid.id}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Icon as={FaUserCheck} color="green.500" />
                <Text fontSize="md" ml={2}>
                  {maskUserId(bid.memberId)} - {formatPrice(bid.bidPrice)}원 입찰 하셨습니다.
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500">
                {formatTimeAgo(bid.createdAt)}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BidList;
