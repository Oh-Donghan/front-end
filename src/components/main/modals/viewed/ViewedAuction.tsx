import { Box, Flex, Text } from '@chakra-ui/react';

export default function ViewedAuction({ title, ongoing }) {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      py={'20px'}
      px={'22px'}
      _hover={{ bgColor: 'rgba(240,240,240,1)' }}
    >
      <Flex alignItems={'center'}>
        <Box
          width={'36px'}
          height={'36px'}
          bgColor={'rgba(230,230,230,1)'}
          borderRadius={'50%'}
          marginRight={'10px'}
        ></Box>
        <Text>{title}</Text>
      </Flex>
      <Text
        fontSize={14}
        fontWeight={'normal'}
        color={ongoing ? 'rgb(49, 130, 206)' : 'rgba(150,150,150,1)'}
      >
        {ongoing ? '진행중' : '거래종료'}
      </Text>
    </Flex>
  );
}
