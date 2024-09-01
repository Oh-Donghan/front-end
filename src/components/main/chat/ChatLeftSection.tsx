import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import ChatList from '../../../components/chat/item/ChatList';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '../../../axios/chat/chat';
import { Dispatch, SetStateAction } from 'react';

interface ChatLeftSectionType {
  selectedChatId: number;
  setSelectedChatId: Dispatch<SetStateAction<number | undefined>>;
  scrollBottom: () => void;
}

export default function ChatLeftSection({
  selectedChatId,
  setSelectedChatId,
  scrollBottom,
}: ChatLeftSectionType) {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chat'],
    queryFn: () => getAllChats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return null;
  }

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
        paddingX={6}
        paddingY={8}
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
