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
} from '@chakra-ui/react';
import Timer from '../timer/Timer';

export default function ItemCard() {
  return (
    <Card borderWidth="1px" borderColor="gray.200" position={'relative'} zIndex={40}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" marginBottom={'8px'}>
            Living room Sofa
          </Heading>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm">현제 입찰가</Text>
            <Text color="blue.600" fontSize="1.4rem" fontWeight={'bold'} marginRight={'3px'}>
              95,000원
            </Text>
          </Flex>

          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm">즉시 구매가</Text>
            <Text fontSize="medium" fontWeight={'bold'} marginRight={'3px'}>
              100,000원
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text fontSize="sm">남은 기간</Text>
            <Timer />
          </Flex>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button variant="solid" colorScheme="blue" width={'full'}>
          경매 참여하기
        </Button>
      </CardFooter>
    </Card>
  );
}
