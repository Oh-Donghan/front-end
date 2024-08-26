import { Box, Flex } from '@chakra-ui/react';

export default function ChatSkeleton() {
  return (
    <Flex
      _hover={{ bgColor: 'rgba(240,240,240,1)' }}
      align="center"
      justify="space-between"
      cursor={'pointer'}
      paddingX={'14px'}
      paddingY={'16px'}
    >
      <Box
        width={'50px'}
        height={'50px'}
        borderRadius={'50%'}
        bgColor={'rgba(200,200,200,1)'}
      ></Box>
      <Box width={'90px'} height={'30px'} bgColor={'rgba(200,200,200,1)'}></Box>
    </Flex>
  );
}
