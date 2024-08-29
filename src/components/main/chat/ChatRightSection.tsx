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
import default_profile from '../../../assets/image/modal/chat/profile.png';
import { useForm } from 'react-hook-form';

export default function ChatRightSection({ ConfirmPurchaseDisclosure, messagesEndRef }) {
  const { register, handleSubmit } = useForm();
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
          <img src={default_profile} alt="기본 프로필 이미지" className="w-[45px] h-[45px]" />
          <Text marginLeft={'10px'} fontSize={'16px'} fontWeight={'bold'}>
            {/* {
          chats.filter(chat => {
            return chat.id === selectedChatId;
          })[0].name
        } */}
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
          <ChatMessage
            type={'me'}
            text={'안녕하세요 구매해주셔서 감사합니다 ㅎㅎ'}
            createdAt={'오후 18:12'}
          />
          <ChatMessage type={'you'} text={'안녕하세요!'} createdAt={'오후 18:14'} />
          <ChatMessage
            type={'me'}
            text={'물건 확인하시면 거래종료 버튼 클릭 부탁드려요!'}
            createdAt={'오후 18:18'}
          />
          <ChatMessage
            type={'me'}
            text={
              '물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!'
            }
            createdAt={'오후 18:18'}
          />
          <ChatMessage
            type={'you'}
            text={
              '물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!'
            }
            createdAt={'오후 18:18'}
          />
          <ChatMessage
            type={'you'}
            text={
              '물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!'
            }
            createdAt={'오후 18:18'}
          />
          <ChatMessage
            type={'you'}
            text={
              '물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!물건 확인하시면 거래종료 버튼 클릭 부탁드려요!'
            }
            createdAt={'오후 18:18'}
          />
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
