import { Flex, Text, Button, Input, InputGroup, InputRightElement, Box } from '@chakra-ui/react';
import ChatList from '../components/chat/ChatList';
import { MdLogout } from 'react-icons/md';
import { useState } from 'react';
import default_profile from '../assets/image/chat/profile.png';
import { IoMdSend } from 'react-icons/io';
import ChatMessage from '../components/chat/ChatMessage';
import { Link } from 'react-router-dom';

const chats = [
  { id: 1, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 2, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 3 },
  { id: 3, name: '산악 자전거', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 4, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 1 },
  { id: 5, name: '다이소 청소기', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 6, name: '유니클로 바지', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 7, name: '자라 가방', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 8, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 9, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 10, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 11, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 12, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
  { id: 13, name: '메시 국대 유니폼', message: '안녕하세요!', time: '19:49', unread: 1 },
  { id: 14, name: '호날두 국대 유니폼', message: '안녕하세요!', time: '18:32', unread: 2 },
];

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState(1);

  return (
    <Flex align={'center'} justify={'center'} className="w-full h-[100vh] bg-gray-300">
      <Flex
        width={'1200px'}
        height={'672px'}
        backgroundColor={'white'}
        borderRadius={'10px'}
        overflow={'hidden'}
        boxShadow={'1px 1px 10px rgba(0,0,0,0.1)'}
      >
        <Flex flexDirection={'column'} flex={1.4}>
          <ChatList selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
          <Flex
            alignItems={'center'}
            height={'70px'}
            paddingY={8}
            paddingX={6}
            shadow={'0px -2px 10px rgba(150,150,150,0.1)'}
          >
            <Link to={'/'} className="flex items-center cursor-pointer">
              <MdLogout size={20} color="rgba(100,100,100,1)" />
              <Text
                cursor={'pointer'}
                color="rgba(100,100,100,1)"
                fontWeight={'semibold'}
                marginLeft={2}
              >
                나가기
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex flex={3} direction={'column'} minWidth={'800px'}>
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
                {
                  chats.filter(chat => {
                    return chat.id === selectedChatId;
                  })[0].name
                }
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
          <Flex direction={'column'}>
            <Flex
              direction={'column'}
              background={'rgba(180,180,180,0.1)'}
              height={'508px'}
              width={'full'}
              padding={'30px'}
              overflowY="scroll"
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
                'scrollbar-width': 'none' /* Firefox */,
              }}
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
            </Flex>
            <Flex
              background={'rgba(180,180,180,0.1)'}
              alignItems={'center'}
              height={'80px'}
              paddingBottom={'16px'}
              paddingX={8}
            >
              <InputGroup>
                <Input
                  placeholder="메세지 입력"
                  bgColor={'white'}
                  border={'none'}
                  boxShadow={'1px 1px 8px rgba(150,150,150,0.1)'}
                />
                <InputRightElement>
                  <Box cursor="pointer" color="rgba(150,150,150,1)" _hover={{ color: 'blue.500' }}>
                    <IoMdSend />
                  </Box>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
