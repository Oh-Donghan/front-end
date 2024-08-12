import { Flex } from '@chakra-ui/react';
import Chat from './Chat';

export default function ChatList() {
  return (
    <Flex
      direction={'column'}
      maxHeight={'390px'}
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
