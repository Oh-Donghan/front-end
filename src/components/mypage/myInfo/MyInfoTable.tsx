import {
  Card,
  Flex,
  Spinner,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  Divider,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchBidData } from '../../../axios/mypage/bid';
import { formatPrice } from '../../../utils/formatPrice';

export default function MyInfoTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bidList'],
    queryFn: fetchBidData,
  });

  console.log('bidList:', data);

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
    <Box
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': { display: 'none' }, // 크롬, 사파리에서 스크롤바 숨기기
        '-ms-overflow-style': 'none', // IE, Edge에서 스크롤바 숨기기
        'scrollbar-width': 'none', // 파이어폭스에서 스크롤바 숨기기
      }}
      h="full"
      maxH={{ base: '72', sm: 'full' }}
      p={2}
      borderRadius="lg"
      boxShadow="lg"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {data.content.map(bidItem => (
          <Card key={bidItem.id}>
            <CardBody>
              <Image
                src={bidItem.thumbnailImageUrl}
                alt="썸네일 이미지"
                borderRadius="lg"
                objectFit="cover" // 이미지 비율 유지
                height={{ base: '200px', md: '250px' }} // 이미지 크기 조정
                width="100%" // 카드에 맞춰 이미지 크기 조정
              />
              <Stack mt="6" spacing="3">
                <Heading size="md" noOfLines={2}>
                  {bidItem.auctionTitle}
                </Heading>
                <Divider />
                <Text fontSize="sm">{bidItem.createdAt}</Text>
                <Text color="blue.600" fontSize="xl" fontWeight="bold">
                  {formatPrice(bidItem.bidPrice)}원
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
