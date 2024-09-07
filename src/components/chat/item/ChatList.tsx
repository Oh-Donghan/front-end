import ChatItem from './ChatItem';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { ChatDataType } from '../../../interface/chat/chatInterface';
import { Dispatch, SetStateAction } from 'react';

interface ChatListType {
  selectedChatId: number;
  setSelectedChatId: Dispatch<SetStateAction<number | undefined>>;
  scrollBottom: () => void;
  isLoading: boolean;
  chats: ChatDataType[];
}

export default function ChatList({
  selectedChatId,
  setSelectedChatId,
  scrollBottom,
  isLoading,
  chats,
}: ChatListType) {
  const handleSelect = id => {
    setSelectedChatId(id);
    scrollBottom();
  };

  if (isLoading) {
    return (
      <Flex w={'390px'} h={'596px'} align={'center'} justify={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  if (chats === undefined || chats.length === 0) {
    return (
      <Flex w={'390px'} h={'596px'} align={'center'} justify={'center'} color={'rgba(70,70,70,1)'}>
        <Text>현재 존재하는 채팅이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      overflowY="scroll"
      sx={{
        '&::-webkitScrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none', // Internet Explorer 10+
        scrollbarWidth: 'none', // Firefox
      }}
      maxH="596px"
      minH="596px"
    >
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChatId === chat.id}
          onSelect={() => handleSelect(chat.id)}
        />
      ))}
    </Flex>
  );
}
