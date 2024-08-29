import { Flex, useDisclosure } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import ConfirmPurchaseModal from '../components/chat/modals/ConfirmPurchaseModal';
import ChatLeftSection from '../components/main/chat/ChatLeftSection';
import ChatRightSection from '../components/main/chat/ChatRightSection';

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const ConfirmPurchaseDisclosure = useDisclosure();

  const scrollBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, []);

  return (
    <>
      <ConfirmPurchaseModal
        isOpen={ConfirmPurchaseDisclosure.isOpen}
        onClose={ConfirmPurchaseDisclosure.onClose}
      />
      <Flex align={'center'} justify={'center'} className="w-full h-[100vh] bg-slate-200">
        <Flex
          width={'1200px'}
          height={'672px'}
          backgroundColor={'white'}
          borderRadius={'10px'}
          overflow={'hidden'}
          boxShadow={'1px 1px 10px rgba(0,0,0,0.1)'}
        >
          {/* 왼쪽 채팅 리스트 부분 */}
          <ChatLeftSection
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
            scrollBottom={scrollBottom}
          />
          {/* 오른쪽 채팅 메시지 부분 */}
          <ChatRightSection
            ConfirmPurchaseDisclosure={ConfirmPurchaseDisclosure}
            messagesEndRef={messagesEndRef}
          />
        </Flex>
      </Flex>
    </>
  );
}
