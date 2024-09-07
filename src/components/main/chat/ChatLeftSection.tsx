import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { ChatDataType } from '../../../interface/chat/chatInterface';
import ChatList from '../../../components/chat/item/ChatList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ChatLeftSectionType {
  selectedChatId: number;
  setSelectedChatId: Dispatch<SetStateAction<number | undefined>>;
  scrollBottom: () => void;
  chatList: ChatDataType[];
  isChatListLoading: boolean;
}

export default function ChatLeftSection({
  selectedChatId,
  setSelectedChatId,
  scrollBottom,
  chatList,
  isChatListLoading,
}: ChatLeftSectionType) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!isChatListLoading && chatList) {
      const memberId = localStorage.getItem('memberId');
      if (memberId) {
        const filteredByMemberId = chatList.filter(
          item => item.seller.memberId === memberId || item.buyer.memberId === memberId,
        );

        setChats(filteredByMemberId);
      }
    }
  }, [chatList, isChatListLoading]);

  return (
    <Flex flexDirection={'column'} flex={1.4}>
      <ChatList
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        scrollBottom={scrollBottom}
        isLoading={isChatListLoading}
        chats={chats}
      />
      <Flex
        alignItems={'center'}
        height={'70px'}
        paddingX={6}
        paddingY={8}
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
  );
}
