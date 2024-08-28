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
import { useState } from 'react';
import { formatMemberCount } from '../../../utils/formatMemberCount';
import { ItemCardProps } from '../../../interface/auction/actionItemInterface';
// import { getCurrentPrice } from '../../../axios/auction/currentPrice';

export default function ItemCard({ rank, item, type }: ItemCardProps) {
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);

  const moveDetail = () => {
    if (isFinished) return;
    navigate(`/detail`);
  };

  // useEffect(() => {
  //   const fetchPrice = async () => {
  //     try {
  //       const data = await getCurrentPrice({ currentPrice });
  //       if (data.currentPrice > currentPrice) {
  //         // 가격이 올랐을 때만 업데이트
  //         setCurrentPrice(data.currentPrice);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching current price:', error);
  //     }
  //   };

  //   fetchPrice();
  // }, [item.id, currentPrice]);

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
              src={item.imageList[0].imageUrl}
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
                {currentPrice.toLocaleString()}원
              </Text>
            </Flex>

            <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
              <Text fontSize="sm">즉시 구매가</Text>
              <Text fontSize="medium" fontWeight={'bold'} marginRight={'3px'}>
                {item.instantPrice.toLocaleString()}원
              </Text>
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
            src={item.imageList[0].imageUrl}
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
              fontSize={{ base: '1.4rem' }}
              fontWeight={'bold'}
              marginRight={'3px'}
              noOfLines={1}
              pl={4}
            >
              {currentPrice.toLocaleString()}원
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
