import React, { useEffect, useRef, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import ChatLeftSection from '../components/main/chat/ChatLeftSection';
import ChatRightSection from '../components/main/chat/ChatRightSection';
import ConfirmPurchaseModal from '../components/chat/modals/ConfirmPurchaseModal';
import { Client, IMessage } from '@stomp/stompjs';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const ConfirmPurchaseDisclosure = useDisclosure();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('roomId');
  const memberId = localStorage.getItem('memberId');

  const scrollBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const client = new Client({
      brokerURL: 'wss://dddang.store/chat-ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
          const body = JSON.parse(message.body);
          setMessages(prevMessages => [...prevMessages, body]);
        });
      },
      onStompError: frame => {
        console.error('STOMP error:', frame.headers['message']);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = (message: string) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify({
          room_id: roomId,
          memberId: memberId,
          message,
        }),
      });
      // 새 메시지를 상태에 추가
      setMessages(prevMessages => [
        ...prevMessages,
        { roomId, senderId: memberId, message, createdAt: new Date().toLocaleString() },
      ]);
    }
  };

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
          <ChatLeftSection
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
            scrollBottom={scrollBottom}
          />
          <ChatRightSection
            ConfirmPurchaseDisclosure={ConfirmPurchaseDisclosure}
            messagesEndRef={messagesEndRef}
            messages={messages}
            setMessages={setMessages} // messages를 업데이트하기 위한 setter 함수 전달
            sendMessage={sendMessage}
            roomId={roomId}
          />
        </Flex>
      </Flex>
    </>
  );
}
