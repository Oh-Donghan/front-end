import ChatItem from './ChatItem';
import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function ChatList({
  selectedChatId,
  setSelectedChatId,
  scrollBottom,
  isLoading,
  chats,
}) {
  const handleSelect = id => {
    setSelectedChatId(id);
    scrollBottom();
  };

  if (isLoading) {
    <Flex>
      <Spinner size={'md'} />
    </Flex>;
  }

  if (chats === undefined || chats.length === 0) {
    return (
      <Flex height={'100%'} justify={'center'} align={'center'} color={'rgba(70,70,70,1)'}>
        <Text>현재 존재하는 채팅이 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction={'column'}
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
        'scrollbar-width': 'none' /* Firefox */,
      }}
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
