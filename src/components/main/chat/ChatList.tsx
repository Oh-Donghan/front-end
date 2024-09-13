import { Flex, Spinner, Text } from '@chakra-ui/react';
import Chat from './Chat';
import { ChatDataType } from '../../../interface/chat/chatInterface';
import { useEffect, useState } from 'react';

interface ChatListPropsType {
  isLoading?: boolean;
  chats: ChatDataType[];
}

export default function ChatList({ chats: filteredChats, isLoading }: ChatListPropsType) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!isLoading && filteredChats) {
      const memberId = localStorage.getItem('memberId');
      if (memberId) {
        const filteredByMemberId = filteredChats.filter(
          item => item.seller.memberId === memberId || item.buyer.memberId === memberId,
        );

        setChats(filteredByMemberId);
      }
    }
  }, [filteredChats, isLoading]);

  if (isLoading) {
    return (
      <Flex height={'100px'} align={'center'} justify={'center'}>
        <Spinner />
      </Flex>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <Flex height={'210px'} align={'center'} justify={'center'}>
        <Text fontSize={'1.05rem'} color={'rgba(90,90,90,1)'} letterSpacing={'0.07rem'}>
          채팅방이 존재하지 않습니다.
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
        msOverflowStyle: 'none', // IE and Edge
        scrollbarWidth: 'none', // Firefox
      }}
    >
      {chats.map(chat => {
        return <Chat key={chat.id} chat={chat} />;
      })}
    </Flex>
  );
}
