import { Flex, Text } from '@chakra-ui/react';

export default function Payment() {
  return (
    <Flex w={'full'} h={'100vh'} bgColor={'white'} align={'center'} justify={'center'}>
      <Flex direction={'column'} w={'400px'} align={'center'} gap={2}>
        <Text fontSize={'1.5rem'} fontWeight={'bold'}>
          Logo
        </Text>
        <Text fontSize={'2rem'} marginTop={3} marginBottom={4}>
          온라인 결제 체험
        </Text>
        <Text fontSize={'1.1rem'}>카카오페이 결제가 완료되었습니다.</Text>
        <Flex
          direction={'column'}
          w={'full'}
          bgColor={'rgba(240,240,240,0.8)'}
          padding={'30px'}
          gap={5}
          marginTop={'30px'}
          borderRadius={'lg'}
        >
          <Flex justify={'space-between'}>
            <Text>구매처</Text>
            <Text fontWeight={'semibold'}>KakaoDevelopers</Text>
          </Flex>
          <Flex justify={'space-between'}>
            <Text>결제일시</Text>
            <Text fontWeight={'semibold'}>2024-08-16T00:54:35</Text>
          </Flex>
          <Flex justify={'space-between'}>
            <Text>상품명</Text>
            <Text fontWeight={'semibold'}>커피</Text>
          </Flex>
          <Flex justify={'space-between'}>
            <Text>결제금액</Text>
            <Text fontWeight={'semibold'}>5,500원</Text>
          </Flex>
          <Flex w={'full'} justify={'center'} marginTop={'14px'}>
            <Text color={'rgba(140,140,140,1)'} fontWeight={'semibold'}>
              체험용 승인 알림톡이 발송되었습니다.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
