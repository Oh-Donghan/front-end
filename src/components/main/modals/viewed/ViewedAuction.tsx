import { Box, Flex, Text } from '@chakra-ui/react';

export default function ViewedAuction({ title, ongoing }) {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      py={['10px', '18px']}
      pl={['10px', '18px']}
      pr={['12px', '20px']}
      _hover={{ bgColor: 'rgba(240,240,240,1)' }}
    >
      <Flex alignItems={'center'}>
        <Box
          width={['28px', '36px']}
          height={['28px', '36px']}
          bgColor={'rgba(230,230,230,1)'}
          borderRadius={'50%'}
          marginRight={['8px', '10px']}
        ></Box>
        <Text fontSize={['14px', '16px']}>{title}</Text>
      </Flex>
      <Text
        fontSize={['xs', 'sm']}
        fontWeight={'normal'}
        color={ongoing ? 'rgb(49, 130, 206)' : 'rgba(150,150,150,1)'}
      >
        {ongoing ? '진행중' : '거래종료'}
      </Text>
    </Flex>
  );
}
