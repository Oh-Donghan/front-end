import { Flex } from '@chakra-ui/react';
import Chat from './Chat';

export default function ChatList() {
  return (
    <Flex direction={'column'}>
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </Flex>
  );
}
