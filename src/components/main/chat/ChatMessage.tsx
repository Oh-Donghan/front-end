import { Flex, Text } from '@chakra-ui/react';

export default function ChatMessage({ text, createdAt, isSentByCurrentUser }) {
  return (
    <Flex
      justify={isSentByCurrentUser ? 'flex-end' : 'flex-start'}
      background={isSentByCurrentUser ? 'blue.100' : 'gray.100'}
      padding={'10px'}
      borderRadius={'10px'}
      marginBottom={'10px'}
    >
      <Text>{text}</Text>
      <Text fontSize={'12px'} color={'gray.500'} marginLeft={'10px'}>
        {createdAt}
      </Text>
    </Flex>
  );
}
