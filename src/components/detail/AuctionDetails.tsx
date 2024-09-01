import { Box, Flex, Text, Button, Input, Badge, useToast } from '@chakra-ui/react';
import Rating from './Rating';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAuctionDetailData } from '../../axios/auctionDetail/auctionDetail';
import { formatPrice } from '../../utils/formatPrice';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import InstantBuyForm from './InstantBuyForm';
import CurrentPoint from './CurrentPoint';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/atom/authAtom';
import Timer from '../main/timer/Timer';
import maskUserId from '../../utils/maskUserId';
import FlipNumbers from 'react-flip-numbers';

const AuctionDetails = ({ auctionId }) => {
  const [auth] = useRecoilState(authState);
  const queryClient = useQueryClient();
  const memberId = localStorage.getItem('memberId');
  const bidPriceRef = useRef(null);
  const toast = useToast();
  const toastRef = useRef(toast);
  const stompClientRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', auctionId],
    queryFn: () => fetchAuctionDetailData(auctionId),
  });

  console.log('data!!:', data);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'wss://dddang.store/auction-websocket',
      reconnectDelay: 2000,
    });

    stompClient.onConnect = frame => {
      console.log('Connected: ', frame);

      // 입찰 성공 수신
      stompClient.subscribe(`/sub/auction/${auctionId}`, message => {
        console.log('Bid successful:', message.body);
        // 새로운 입찰 정보가 들어오면 쿼리를 무효화하여 데이터를 새로고침
        queryClient.invalidateQueries({ queryKey: ['detail', auctionId] });
        return toastRef.current({
          title: '입찰 성공',
          description: '성공적으로 입찰 되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });

      // 입찰 실패 수신
      stompClient.subscribe(`/sub/errors/${memberId}`, message => {
        const parsedMessage = JSON.parse(message.body);

        let errorMessage;

        switch (parsedMessage.bidStatus) {
          case 'POINT_FAIL':
            errorMessage = `포인트 부족: 필요한 포인트는 ${parsedMessage.bidAmount}P이며, 현재 사용 가능한 포인트는 ${parsedMessage.currentPoint}P입니다. 추가로 ${parsedMessage.bidAmount - parsedMessage.currentPoint}P가 필요합니다.`;
            break;
          case 'BID_FAIL':
            errorMessage = `입찰 실패: 다른 사용자가 이미 ${parsedMessage.previousBidAmount}P에 입찰했습니다.`;
            break;
          default:
            errorMessage = parsedMessage.message || '알 수 없는 오류가 발생했습니다.';
            break;
        }

        return toastRef.current({
          title: '입찰 실패',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
    };

    stompClient.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.activate(); // WebSocket 연결 시작

    stompClientRef.current = stompClient; // stompClient를 ref에 저장

    return () => {
      stompClient.deactivate(); // 컴포넌트 언마운트 시 WebSocket 연결 종료
    };
  }, [auctionId, memberId, queryClient]);

  const handleBidSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (data.seller.memberId === memberId) {
      toast({
        description: '본인의 경매는 입찰할 수 없습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const bidPrice = bidPriceRef.current?.value;

    if (bidPrice.length === 0) {
      toast({
        description: '입력을 해주세요.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    if (
      bidPrice &&
      Number(bidPrice) > 0 &&
      stompClientRef.current &&
      stompClientRef.current.connected
    ) {
      stompClientRef.current.publish({
        destination: '/pub/bid',
        body: JSON.stringify({
          auctionId,
          bidAmount: Number(bidPrice),
          memberId,
        }),
      });

      // 입력 필드 비우기
      if (bidPriceRef.current) {
        bidPriceRef.current.value = '';
      }
    }
  };

  const getDeliveryTypeText = (type: string) => {
    const deliveryTypeMap = {
      PREPAY: '선불',
      NO_PREPAY: '착불',
      NO_DELIVERY: '택배 불가능',
    };
    return deliveryTypeMap[type] || '';
  };

  const getReceiveTypeText = (type: string) => {
    const receiveTypeMap = {
      CONTACT: '대면 거래',
      DELIVERY: '택배',
      ALL: '모두 가능',
    };
    return receiveTypeMap[type] || '';
  };

  if (isLoading) {
    <div>Data Loading...</div>;
  }

  if (isError) {
    <div>fetch Error...</div>;
  }

  if (isFinished) {
    toast({
      description: '경매가 종료 되었습니다.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }

  return isLoading ? (
    '로딩'
  ) : (
    <Box flex="1">
      <Flex gap={4} alignItems="center" wrap="wrap">
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
          {data?.title}
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600">
          <Timer endedAt={data?.endedAt} setIsFinished={setIsFinished} />
        </Text>
      </Flex>

      <Flex gap={{ base: '4', md: '8' }} mt={4}>
        <Flex alignItems="end">
          <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} color="gray.700">
            현재 입찰가
          </Text>
          <Flex
            fontSize={{ base: 'md', sm: 'lg', md: '2xl' }}
            color={'#3182ce'}
            fontWeight="bold"
            pl="10px"
          >
            <FlipNumbers
              height={17.5}
              width={13}
              color="rgb(49, 130, 206)"
              background="white"
              play
              perspective={100}
              numbers={formatPrice(data.currentPrice)}
            />
            <Text>원</Text>
          </Flex>
        </Flex>
        <Flex alignItems="end">
          <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} color="gray.700">
            즉시 구매가
          </Text>
          <Text
            fontSize={{ base: 'md', sm: 'lg', md: '2xl' }}
            color={'#3182ce'}
            fontWeight="bold"
            pl="10px"
          >
            {data?.instantPrice ? `${formatPrice(data.instantPrice)}원` : '가격 정보 없음'}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2} mt={4}>
        <Text fontSize="lg">상품명: {data?.productName}</Text>
        <Text>판매자: {maskUserId(data?.seller.memberId)}</Text>
        <Text fontSize="md" color="gray.600">
          {data?.productDescription}
        </Text>
        {/* 컬러값 */}
        <Text fontSize="md" color="gray.600">
          색상: {data?.productColor}
        </Text>
        <Flex mt={4} gap={4} direction="column">
          <Flex gap={6}>
            <Box>
              <Text>거래 방법</Text>
              <Badge fontSize="16px" colorScheme="blue">
                {getReceiveTypeText(data?.receiveType)}
              </Badge>
            </Box>
            <Box>
              <Text>택배비 지불 방법</Text>
              <Badge fontSize="16px" variant="outline" colorScheme="green">
                {getDeliveryTypeText(data?.deliveryType)}
              </Badge>
            </Box>
          </Flex>
          {/* 별점 컴포넌트 */}
          <Rating rate={data?.productStatus} />
        </Flex>
      </Flex>

      <Box mt={4}>
        <Flex justifyContent="end">
          <CurrentPoint />
        </Flex>
        <form onSubmit={handleBidSubmit}>
          <Flex mt={2} gap={2}>
            <Input
              ref={bidPriceRef}
              type="number"
              placeholder={!auth ? '로그인 후 이용 가능합니다.' : '입찰할 포인트를 적어주세요.'}
              variant="outline"
              borderColor="gray.300"
              py={2}
              px={3}
              flex="1"
              isDisabled={!auth}
            />
            <Button type="submit" colorScheme="blue" variant="outline" isDisabled={!auth}>
              입찰하기
            </Button>
          </Flex>
        </form>
        <InstantBuyForm auctionId={auctionId} />
      </Box>
    </Box>
  );
};

export default AuctionDetails;
