import { Box, Flex, Text } from '@chakra-ui/react';
import ChatList from '../components/chat/ChatList';
import { MdLogout } from 'react-icons/md';

export default function Chat() {
  return (
    <Flex align={'center'} justify={'center'} className="w-full h-[828px] bg-gray-100">
      <Flex width={'1500px'} height={'646px'} backgroundColor={'white'}>
        <Flex flexDirection={'column'} flex={1} borderRight={'1px solid rgba(200,200,200,0.4)'}>
          <ChatList />
          <Flex alignItems={'center'} height={'70px'} paddingY={8} paddingX={6}>
            <MdLogout size={20} color="rgba(100,100,100,1)" />
            <Text
              cursor={'pointer'}
              color="rgba(100,100,100,1)"
              fontWeight={'semibold'}
              marginLeft={2}
            >
              나가기
            </Text>
          </Flex>
        </Flex>
        <Flex flex={3}>
          <Flex></Flex>
          <Flex>
            <Flex></Flex>
            <Flex></Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
