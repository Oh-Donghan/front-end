import { Box, Flex, Text, Button, Input } from '@chakra-ui/react';
import Rating from './Rating';

const AuctionDetails = () => {
  return (
    <Box flex="1">
      <Flex gap={4} alignItems="center">
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
          경매 아이템 이름
        </Text>
        <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600">
          6:22:42:21
        </Text>
      </Flex>

      <Flex gap={{ base: '4', md: '8' }} mt={4}>
        <Flex alignItems="end">
          <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} color="gray.500">
            현재 입찰가
          </Text>
          <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} fontWeight="bold" pl="10px">
            95,000원
          </Text>
        </Flex>
        <Flex alignItems="end">
          <Text fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} color="gray.500">
            즉시 구매가
          </Text>
          <Text fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} fontWeight="bold" pl="10px">
            100,000원
          </Text>
        </Flex>
      </Flex>

      <Box mt={4}>
        <Text fontSize="lg" mb={2}>
          상품 이름
        </Text>
        <Text fontSize="md" color="gray.600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
          elementum tristique. Duis cursus, mi quis viverra ornare.
        </Text>
        <Flex mt={4} gap={4} direction="column">
          <Box>
            <Text fontWeight="bold">거래 방법</Text>
            <Flex gap={2} marginTop="4px">
              <Button variant="solid" colorScheme="blackAlpha" size="sm">
                택배 거래 / 착불
              </Button>
              <Button variant="outline" colorScheme="blackAlpha" size="sm">
                직거래 가능
              </Button>
              <Button variant="outline" colorScheme="blackAlpha" size="sm">
                둘 다 가능
              </Button>
            </Flex>
          </Box>
          {/* 별점 컴포넌트 */}
          <Rating />
        </Flex>
      </Box>

      <Box mt={4}>
        <Flex justifyContent="end">
          <Text color="gray.600" fontSize={{ base: 'lg', md: 'xl' }}>
            사용 가능 포인트: 200,000P
          </Text>
        </Flex>
        <form>
          <Flex mt={2} gap={2}>
            <Input
              type="text"
              placeholder="입찰할 포인트를 적어주세요."
              variant="outline"
              borderColor="gray.300"
              py={2}
              px={3}
              flex="1"
            />
            <Button type="submit" colorScheme="blackAlpha" variant="outline">
              입찰하기
            </Button>
          </Flex>
        </form>
        <Button colorScheme="blackAlpha" w="full" mt={2}>
          즉시 구매
        </Button>
      </Box>
    </Box>
  );
};

export default AuctionDetails;
