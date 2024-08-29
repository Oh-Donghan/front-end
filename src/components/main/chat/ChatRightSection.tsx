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

export default function ChatRightSection({
  ConfirmPurchaseDisclosure,
  messagesEndRef,
  messages,
  sendMessage,
}) {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

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
            {/* 상대방 이름 */}
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
              type={message.type}
              text={message.text}
              createdAt={message.createdAt}
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
