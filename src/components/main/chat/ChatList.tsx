import { Flex } from '@chakra-ui/react';
import Chat from './Chat';

interface ChatListPropsType {
  isLoading?: boolean;
}

export default function ChatList({ isLoading }: ChatListPropsType) {
  const chatSkeletonArray = new Array(5).fill(null);

  if (isLoading) {
    return (
      <Flex direction={'column'} maxHeight={'410px'}>
        {chatSkeletonArray.map((_, i) => {
          return <Chat key={i} />;
        })}
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
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </Flex>
  );
}
