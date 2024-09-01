import {
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import ChatMessage from '../../../components/chat/item/ChatMessage';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getChatsById } from '../../../axios/chat/chat';
import { useEffect, useState } from 'react';

export default function ChatRightSection({
  ConfirmPurchaseDisclosure,
  messagesEndRef,
  messages,
  setMessages, // messages를 업데이트하기 위한 setter 함수 추가
  sendMessage,
  roomId,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [inputText, setInputText] = useState('');
  const memberId = localStorage.getItem('memberId');
  const toast = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['chat', 'room', roomId],
    queryFn: () => getChatsById({ roomId }),
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    enabled: !!roomId,
  });

  useEffect(() => {
    if (data) {
      // 가져온 데이터를 기존 메시지에 추가
      setMessages([...data]);
    }
  }, [data, setMessages]);

  useEffect(() => {
    reset();
  }, [roomId]);

  const onSubmit = data => {
    if (!data.message.trim()) {
      toast({
        title: '메세지를 채워주세요',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    // 메시지 전송
    sendMessage(data.message);

    // 폼 리셋
    reset();
  };

  if (isLoading) {
    return null;
  }

  return (
    <Flex flex={3} direction={'column'} minWidth={'800px'}>
      {/* 오른쪽 채팅 메시지 헤더 */}
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'full'}
        boxShadow={'0px 1px 6px rgba(100,100,100,0.1)'}
        paddingX={'16px'}
        paddingY={'20px'}
      >
        <Flex alignItems={'center'}>
          <Text marginLeft={'10px'} fontSize={'16px'} fontWeight={'bold'}>
            {/* */}
          </Text>
        </Flex>
        <Flex gap={2}>
          <Button
            colorScheme="blue"
            variant="outline"
            fontWeight={'normal'}
            fontSize={'14px'}
            paddingY={'8px'}
            paddingX={'12px'}
            onClick={() => {
              ConfirmPurchaseDisclosure.onOpen();
            }}
          >
            구매확정
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            fontWeight={'normal'}
            fontSize={'14px'}
            paddingY={'8px'}
            paddingX={'12px'}
          >
            채팅종료
          </Button>
        </Flex>
      </Flex>
      {/* 오른쪽 채팅 메시지 채팅들 */}
      <Flex direction={'column'}>
        <Flex
          direction={'column'}
          background={'rgba(180,180,180,0.1)'}
          height={'508px'}
          width={'full'}
          padding={'30px'}
          paddingBottom={0}
          overflowY="scroll"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
            'scrollbar-width': 'none' /* Firefox */,
          }}
          gap={7}
        >
          {/* 메시지 표시 */}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              text={message.message}
              createdAt={message.createdAt}
              isMyMessage={!!(message.senderId !== memberId)}
            />
          ))}
          <div ref={messagesEndRef} />
        </Flex>
        <Flex
          background={'rgba(180,180,180,0.1)'}
          alignItems={'center'}
          height={'80px'}
          paddingBottom={'16px'}
          paddingX={8}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <InputGroup>
              <Input
                placeholder="메세지 입력"
                bgColor={'white'}
                border={'none'}
                boxShadow={'1px 1px 8px rgba(150,150,150,0.1)'}
                defaultValue={inputText}
                onChange={e => {
                  setInputText(e.target.value);
                }}
                {...register('message')}
              />
              <InputRightElement>
                <Button
                  bgColor={'rgba(0,0,0,0)'}
                  padding={0}
                  type="submit"
                  cursor="pointer"
                  color="rgba(150,150,150,1)"
                  _hover={{ color: 'blue.500' }}
                >
                  <IoMdSend />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}
