import { useEffect, useRef, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import ChatLeftSection from '../components/main/chat/ChatLeftSection';
import ChatRightSection from '../components/main/chat/ChatRightSection';
import ConfirmPurchaseModal from '../components/chat/modals/ConfirmPurchaseModal';
import { Client, IMessage } from '@stomp/stompjs';
import { getAllChats } from '../axios/chat/chat';
import { useQuery } from '@tanstack/react-query';
import { formatDateToCustomString } from '../utils/dateFormat';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const ConfirmPurchaseDisclosure = useDisclosure();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('id');
  const memberId = localStorage.getItem('memberId');

  const { data: chatList, isLoading: isChatListLoading } = useQuery({
    queryKey: ['chat'],
    queryFn: () => getAllChats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const scrollBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, [messages]);

  useEffect(() => {
    setSelectedChatId(parseInt(roomId));
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
        console.log('STOMP client connected');
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
          roomId: roomId,
          senderId: memberId,
          message,
        }),
      });
      // 새 메시지를 상태에 추가
      setMessages(prevMessages => [
        ...prevMessages,
        {
          roomId,
          senderId: memberId,
          message,
          createdAt: formatDateToCustomString(new Date()),
        },
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
          backgroundColor={'white'}
          borderRadius={'10px'}
          overflow={'hidden'}
          boxShadow={'1px 1px 10px rgba(0,0,0,0.1)'}
        >
          <ChatLeftSection
            selectedChatId={selectedChatId}
            setSelectedChatId={setSelectedChatId}
            scrollBottom={scrollBottom}
            chatList={chatList}
            isChatListLoading={isChatListLoading}
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
