import { Flex } from '@chakra-ui/react';
import Chat from './Chat';
import { useQuery } from '@tanstack/react-query';
import { getChat } from '../../../axios/chat/chat';
import { useEffect } from 'react';

export default function ChatList() {
  const { data, isLoading } = useQuery({
    queryKey: ['chat'],
    queryFn: () => getChat(),
    staleTime: 2 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <Flex direction={'column'} maxHeight={'410px'}>
        <Chat />
        <Chat />
        <Chat />
        <Chat />
        <Chat />
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
