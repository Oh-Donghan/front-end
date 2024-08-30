import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import ChatList from '../../../components/chat/item/ChatList';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '../../../axios/chat/chat';

export default function ChatLeftSection({ selectedChatId, setSelectedChatId, scrollBottom }) {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chat'],
    queryFn: () => getAllChats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return (
    <Flex flexDirection={'column'} flex={1.4}>
      <ChatList
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        scrollBottom={scrollBottom}
        isLoading={isLoading}
        chats={chats}
      />
      <Flex
        alignItems={'center'}
        height={'70px'}
        paddingY={8}
        paddingX={6}
        shadow={'0px -2px 10px rgba(150,150,150,0.1)'}
      >
        <Link to={'/'} className="flex items-center cursor-pointer">
          <MdLogout size={20} color="rgba(100,100,100,1)" />
          <Text
            cursor={'pointer'}
            color="rgba(100,100,100,1)"
            fontWeight={'semibold'}
            marginLeft={2}
          >
            나가기
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
