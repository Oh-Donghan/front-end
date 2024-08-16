import { Flex, Text } from '@chakra-ui/react';

export default function ChatMessage({ type, text, createdAt }) {
  return (
    <Flex alignItems={'end'} justifyContent={type === 'me' ? 'start' : 'end'} marginBottom={'20px'}>
      {type === 'you' && (
        <Text marginRight={'10px'} marginBottom={'4px'} fontSize={13}>
          {createdAt}
        </Text>
      )}
      <Text
        fontSize={15}
        bgColor={type === 'me' ? 'white' : 'rgb(120,227,120)'}
        color={type === 'me' ? 'rgba(50,50,50,1)' : 'white'}
        paddingY={'12px'}
        paddingX={'18px'}
        borderRadius={'10px'}
        boxShadow={'1px 1px 8px rgba(150,150,150,0.4)'}
        maxWidth={'650px'}
        lineHeight={'30px'}
      >
        {text}
      </Text>
      {type === 'me' && (
        <Text marginLeft={'10px'} marginBottom={'4px'} fontSize={13}>
          {createdAt}
        </Text>
      )}
    </Flex>
  );
}
