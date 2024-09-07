import { Flex, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { ChatDataType } from '../../../interface/chat/chatInterface';
import ChatList from '../../../components/chat/item/ChatList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventSourceState } from '../../../recoil/atom/eventSourceAtom';
import { isNewNotificationState } from '../../../recoil/atom/alarmAtom';
import { authState } from '../../../recoil/atom/authAtom';

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
  const auth = useRecoilValue(authState);
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const [, setIsNewNotification] = useRecoilState(isNewNotificationState);
  // const toast = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      const memberId = localStorage.getItem('memberId');
      const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

      if (eventSource) {
        console.log('Unsubscribed from notifications');
        eventSource.close();
        setEventSource(null);
      }

      // last-event-id와 memberId를 URL의 쿼리 파라미터로 포함.
      const url = new URL('https://dddang.store/api/members/notification/subscribe');
      if (lastEventId) {
        url.searchParams.append('lastEventId', lastEventId);
      }
      if (memberId) {
        url.searchParams.append('memberId', memberId);
      }

      const source = new EventSource(url.toString());

      source.addEventListener('sse', e => {
        console.log('xx');
        console.log(e.data);

        if (e.data.startsWith('{')) {
          try {
            const eventData = JSON.parse(e.data);

            if (!eventData.dummyContent) {
              // 새로운 알림 도착 시 상태 업데이트
              setIsNewNotification(true);
              console.log(eventData);

              // last event id를 로컬 스토리지에 저장
              const memberId = localStorage.getItem('memberId');
              if (memberId && eventData.id) {
                localStorage.setItem(`last-event-id-${memberId}`, eventData.id.toString());
              }

              // 구매자가 구매확정을 눌렀을 시 rooms?id=0으로 redirect
              if (eventData.content && eventData.content.includes('경매의 구매를 확정했습니다')) {
                console.log('ㅇㄴㅇㄴ');
                console.log(eventData.member.memberId);

                // toast({
                //   title: '구매자가 구매확정을 눌렀습니다.',
                //   status: 'info',
                //   duration: 1300,
                // });

                // // toast가 사라지는 시간을 기준으로 navigate 호출
                // setTimeout(() => {
                //   navigate('/rooms?id=0');
                // }, 1500);
              }
            }
          } catch (error) {
            console.error('Failed to parse event data:', error);
          }
        }
      });

      source.onopen = () => {
        console.log('open!!!');
      };

      source.onerror = function (e) {
        console.error('SSE error occurred:', e);
        // source.close(); // 에러가 발생시 SSE 연결을 닫음
      };

      setEventSource(source);
      console.log('Subscribed to notifications');
    }
  }, []);

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
