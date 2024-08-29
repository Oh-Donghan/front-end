import { Flex, Spinner, Text } from '@chakra-ui/react';
import Chat from './Chat';
// import { ChatResponseType } from '../../../interface/chat/chatInterface';

// interface ChatListPropsType {
//   isLoading?: boolean;
//   data?: ChatResponseType
// }

export default function ChatList({ data, isLoading }) {
  if (isLoading) {
    return (
      <Flex height={'410px'} align={'center'} justify={'center'}>
        <Spinner />
      </Flex>
    );
  }

  if (!data || data.length === 0 || data.data[4].auction.length === 0) {
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
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}
    >
      {data?.data[4]?.map(auction => {
        return <Chat key={auction.id} />;
      })}
    </Flex>
  );
}
