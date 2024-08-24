import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Divider,
  CardFooter,
  Button,
  Flex,
  Badge,
  Box,
} from '@chakra-ui/react';
import Timer from '../timer/Timer';
import { HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatMemberCount } from '../../../utils/formatMemberCount';

interface AuctionItem {
  id: number;
  title: string;
  productName: string;
  productStatus: number;
  receiveType: string;
  deliveryType: string;
  currentPrice: number;
  instantPrice: number;
  memberCount: number;
  endedAt: string;
  childCategory: {
    id: number;
    categoryName: string;
    parentId: number;
    createdAt: string;
  };
  imageList: Array<{
    id: number;
    imageUrl: string;
    imageName: string;
    imageType: string;
    auctionId: number;
    createdAt: string;
  }>;
}

interface ItemCardProps {
  rank?: number;
  item?: AuctionItem;
  type?: string;
  isLoading?: boolean;
}

export default function ItemCard({ rank, item, type }: ItemCardProps) {
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);

  const moveDetail = () => {
    if (isFinished) return;
    navigate(`/detail`);
  };

  // useEffect(() => {
  //   const eventSource = new EventSource(`/api/auction/${item.id}/price-updates`);

  //   eventSource.onmessage = function (event) {
  //     const data = JSON.parse(event.data);
  //     setCurrentPrice(data.currentPrice);
  //   };

  //   eventSource.onerror = function (error) {
  //     console.error('Error with SSE:', error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [item.id]);

  if (type === 'hot') {
    return (
      <Card
        borderWidth="1px"
        borderColor="gray.200"
        position={'relative'}
        zIndex={40}
        onClick={moveDetail}
        cursor={'pointer'}
      >
        <CardBody>
          <Box position={'relative'}>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt={item.imageList[0].imageName}
              borderRadius="lg"
            />
            <Badge position={'absolute'} top={2} right={2} bgColor={'rgba(200,200,200,0.2)'}>
              <Flex alignItems={'center'}>
                <HiUser className="mr-1" />
                <Text>{formatMemberCount(item.memberCount)}</Text>
              </Flex>
            </Badge>
            {rank &&
              rank <= 5 && ( // 랭킹이 1~5일 때만 표시
                <Box position="absolute" top={1.5} left={4} zIndex={50}>
                  <Text
                    fontSize="1.8rem"
                    fontWeight="bold"
                    color="rgba(255, 255, 255, 0.9)"
                    textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"
                  >
                    {rank}
                  </Text>
                </Box>
              )}
          </Box>
          <Stack mt="6" spacing="3">
            <Stack direction="row">
              {item.receiveType === 'CONTACT' && <Badge colorScheme="green">직거래</Badge>}
              {item.receiveType === 'DELIVERY' && <Badge colorScheme="blue">택배</Badge>}
              {item.receiveType === 'ALL' && (
                <>
                  <Badge colorScheme="green">직거래</Badge> <Badge colorScheme="blue">택배</Badge>
                </>
              )}
            </Stack>
            <Heading size="md" marginBottom={'8px'}>
              {item.title}
            </Heading>
            <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
              <Text fontSize="sm">현제 입찰가</Text>
              <Text color="blue.600" fontSize="1.4rem" fontWeight={'bold'} marginRight={'3px'}>
                {item.currentPrice.toLocaleString()}원
              </Text>
            </Flex>

            <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
              <Text fontSize="sm">즉시 구매가</Text>
              <Text fontSize="medium" fontWeight={'bold'} marginRight={'3px'}>
                {item.instantPrice.toLocaleString()}원
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
              <Text fontSize="sm">남은 기간</Text>
              <Timer endedAt={item.endedAt} setIsFinished={setIsFinished} />
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button variant="solid" colorScheme={isFinished ? 'gray' : 'blue'} width={'full'}>
            {isFinished ? '경매 참여 불가' : '경매 참여하기'}
          </Button>
        </CardFooter>
      </Card>
    ); // 혹은 스켈레톤 또는 로딩 UI 반환
  }

  return (
    <Card
      borderWidth="1px"
      borderColor="gray.200"
      position={'relative'}
      zIndex={40}
      onClick={moveDetail}
      cursor={'pointer'}
    >
      <CardBody>
        <Box position={'relative'}>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt={item.imageList[0].imageName}
            borderRadius="lg"
          />
          <Badge position={'absolute'} top={2} right={2} bgColor={'rgba(200,200,200,0.2)'}>
            <Flex alignItems={'center'}>
              <HiUser className="mr-1" />
              <Text>{formatMemberCount(item.memberCount)}</Text>
            </Flex>
          </Badge>
          {rank &&
            rank <= 5 && ( // 랭킹이 1~5일 때만 표시
              <Box position="absolute" top={1.5} left={4} zIndex={50}>
                <Text
                  fontSize="1.8rem"
                  fontWeight="bold"
                  color="rgba(255, 255, 255, 0.9)"
                  textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"
                >
                  {rank}
                </Text>
              </Box>
            )}
        </Box>
        <Stack mt="6" spacing="3">
          <Stack direction="row">
            {item.receiveType === 'CONTACT' && <Badge colorScheme="green">직거래</Badge>}
            {item.receiveType === 'DELIVERY' && <Badge colorScheme="blue">택배</Badge>}
            {item.receiveType === 'ALL' && (
              <>
                <Badge colorScheme="green">직거래</Badge> <Badge colorScheme="blue">택배</Badge>
              </>
            )}
          </Stack>
          <Heading size="md" marginBottom={'8px'} noOfLines={1}>
            {item.title}
          </Heading>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm" flexShrink={0}>
              현제 입찰가
            </Text>
            <Text
              color="blue.600"
              fontSize={{ base: '1.3rem' }}
              fontWeight={'bold'}
              marginRight={'3px'}
              noOfLines={1}
              pl={4}
            >
              {item.currentPrice.toLocaleString()}원
            </Text>
          </Flex>

          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm" flexShrink={0}>
              즉시 구매가
            </Text>
            <Text fontSize="medium" fontWeight={'bold'} marginRight={'3px'} noOfLines={1} pl={4}>
              {item.instantPrice.toLocaleString()}원
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm">남은 기간</Text>
            <Timer endedAt={item.endedAt} setIsFinished={setIsFinished} />
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme={isFinished ? 'gray' : 'blue'} width={'full'}>
          {isFinished ? '경매 참여 불가' : '경매 참여하기'}
        </Button>
      </CardFooter>
    </Card>
  );
}
