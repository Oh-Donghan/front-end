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
import { useState, useEffect } from 'react';
import { formatMemberCount } from '../../../utils/formatMemberCount';
import { ItemCardProps } from '../../../interface/auction/actionItemInterface';
import FlipNumbers from 'react-flip-numbers';

export default function ItemCard({ rank, item, type, auctionArray }: ItemCardProps) {
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);

  const moveDetail = () => {
    if (isFinished) return;
    navigate(`/detail/${item.id}`);
  };

  useEffect(() => {
    // auctionArray가 undefined이면 빈 배열을 사용
    const auctionArraySafe = auctionArray || [];

    // auctionArray에서 item.id와 auctionId가 일치하는 객체 찾기
    const matchingAuction = auctionArraySafe.find(auction => auction.auctionId === item.id);

    if (matchingAuction) {
      // 현재 가격 업데이트
      if (currentPrice !== matchingAuction.bidAmount) {
        setCurrentPrice(matchingAuction.bidAmount);
      }
    }
  }, [auctionArray, item.id, currentPrice]);

  // 가격 변경 애니메이션 효과

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
            <Box
              width={'100%'}
              height={'300px'}
              overflow={'hidden'}
              borderRadius="lg"
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              boxShadow={'1px 1px 6px rgba(0,0,0,0.1)'}
            >
              <Image
                src={item.imageList[0].imageUrl}
                alt={item.imageList[0].imageName}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>
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
                    color="rgba(255, 255, 255, 1)"
                    textShadow="1px 1px 2px rgba(0, 0, 0, 0.9)"
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
              <Text noOfLines={1}>{item.title}</Text>
            </Heading>
            <Flex justifyContent={'space-between'} alignItems={'center'} height={'28px'}>
              <Text fontSize="sm">현재 입찰가</Text>
              <Box fontSize="1.3rem" fontWeight={'bold'} marginRight={'3px'}>
                <Flex color="rgb(49, 130, 206)">
                  <FlipNumbers
                    height={17.5}
                    width={13}
                    color="rgb(49, 130, 206)"
                    background="white"
                    play
                    perspective={100}
                    numbers={currentPrice.toLocaleString()}
                  />
                  <Text>원</Text>
                </Flex>
              </Box>
            </Flex>

            <Flex justifyContent={'space-between'} alignItems={'center'} height={'28px'}>
              <Text fontSize="sm">즉시 구매가</Text>
              <Flex>
                <Text
                  fontSize="medium"
                  fontWeight={'semibold'}
                  marginRight={'3px'}
                  color={'rgba(80,80,80,1)'}
                >
                  {item.instantPrice.toLocaleString()}
                </Text>
                <Text fontWeight={'normal'} mr={1}>
                  원
                </Text>
              </Flex>
            </Flex>
            <Flex justifyContent={'space-between'} alignItems={'center'} height={'28px'}>
              <Text fontSize="sm">기간</Text>
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
          <Box
            width={'100%'}
            height={'300px'}
            overflow={'hidden'}
            borderRadius="lg"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            boxShadow={'1px 1px 6px rgba(0,0,0,0.1)'}
          >
            <Image
              src={item.imageList[0].imageUrl}
              alt={item.imageList[0].imageName}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
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
                  color="rgba(255, 255, 255, 1)"
                  textShadow="1px 1px 2px rgba(0, 0, 0, 0.9)"
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
            <Text noOfLines={1}>{item.title}</Text>
          </Heading>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm" flexShrink={0}>
              현재 입찰가
            </Text>
            <Box fontSize="1.3rem" fontWeight={'bold'} marginRight={'3px'}>
              <Flex color="rgb(49, 130, 206)">
                <FlipNumbers
                  height={17.5}
                  width={13}
                  color="rgb(49, 130, 206)"
                  background="white"
                  play
                  perspective={100}
                  numbers={currentPrice.toLocaleString()}
                />
                <Text>원</Text>
              </Flex>
            </Box>
          </Flex>

          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm" flexShrink={0}>
              즉시 구매가
            </Text>
            <Flex>
              <Text
                fontSize="medium"
                fontWeight={'semibold'}
                marginRight={'3px'}
                color={'rgba(80,80,80,1)'}
              >
                {item.instantPrice.toLocaleString()}
              </Text>
              <Text fontWeight={'normal'} mr={1}>
                원
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm">기간</Text>
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
