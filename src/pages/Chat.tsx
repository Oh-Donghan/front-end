import { Flex } from '@chakra-ui/react';
import ChatList from '../components/chat/ChatList';

export default function Chat() {
  return (
    <Flex>
      <Flex>
        <ChatList />
      </Flex>
      <Flex></Flex>
    </Flex>
  );
}
