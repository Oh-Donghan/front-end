import { Flex, Spinner, Text } from '@chakra-ui/react';
import Chat from './Chat';
import { ChatDataType } from '../../../interface/chat/chatInterface';

interface ChatListPropsType {
  isLoading?: boolean;
  chats: ChatDataType[];
}

export default function ChatList({ chats, isLoading }: ChatListPropsType) {
  if (isLoading) {
    return (
      <Flex height={'100px'} align={'center'} justify={'center'}>
        <Spinner />
      </Flex>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <Flex height={'410px'} align={'center'} justify={'center'}>
        <Text fontSize={'1.05rem'} color={'rgba(90,90,90,1)'} letterSpacing={'0.07rem'}>
          현재 등록된 채팅이 없습니다.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction={'column'}
      maxHeight={'410px'}
      overflowY={'scroll'}
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none', // 수정된 부분 (IE and Edge)
        scrollbarWidth: 'none', // Firefox
      }}
    >
      {chats?.map(chat => {
        return <Chat key={chat.id} chat={chat} />;
      })}
    </Flex>
  );
}
