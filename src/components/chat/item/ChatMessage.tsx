import { Flex, Text } from '@chakra-ui/react';
import { timeAgo } from '../../../utils/dateFormat';

export default function ChatMessage({ text, createdAt, isMyMessage }) {
  return (
    <Flex alignItems={'end'} justifyContent={isMyMessage ? 'start' : 'end'}>
      {!isMyMessage && (
        <Text marginRight={'10px'} marginBottom={'4px'} fontSize={13} color={'rgba(130,130,130,1)'}>
          {timeAgo(createdAt)}
        </Text>
      )}
      <Text
        fontSize={15}
        bgColor={isMyMessage ? 'white' : 'rgb(120,227,120)'}
        color={isMyMessage ? 'rgba(50,50,50,1)' : 'white'}
        paddingY={'12px'}
        paddingX={'18px'}
        borderRadius={'10px'}
        boxShadow={'1px 1px 8px rgba(150,150,150,0.4)'}
        maxWidth={'650px'}
        lineHeight={'30px'}
      >
        {text}
      </Text>
      {isMyMessage && (
        <Text marginLeft={'10px'} marginBottom={'4px'} fontSize={13}>
          {timeAgo(createdAt)}
        </Text>
      )}
    </Flex>
  );
}
