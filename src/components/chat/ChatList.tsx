import ChatItem from './ChatItem';
import { Flex } from '@chakra-ui/react';

const chats = [
  { id: 1, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 2, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 3 },
  { id: 3, name: '산악 자전거', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 4, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 1 },
  { id: 5, name: '다이소 청소기', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 6, name: '유니클로 바지', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 7, name: '자라 가방', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 8, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 9, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 10, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 11, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 12, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 13, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 14, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
];

export default function ChatList({ selectedChatId, setSelectedChatId }) {
  const handleSelect = id => {
    setSelectedChatId(id);
  };

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
