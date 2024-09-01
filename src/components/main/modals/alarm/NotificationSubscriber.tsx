import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToast } from '@chakra-ui/react';

function NotificationComponent({ lastEventId }) {
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const url = `https://dddang.store/api/members/notification/subscribe`;

    // 헤더 객체 생성
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // lastEventId가 존재할 때만 Last-Event-ID 헤더 추가
    if (lastEventId) {
      headers['Last-Event-ID'] = lastEventId;
    }

    // EventSourcePolyfill 초기화
    const es = new EventSourcePolyfill(url, {
      headers,
    });

    es.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log('New notification:', data);

      toast({
        title: '새로운 알림이 도착했습니다.',
        description: data.message,
        status: 'info',
        duration: 2000,
      });
    };

    es.onerror = error => {
      console.error('SSE connection error:', error);
      toast({
        title: '연결 오류',
        description: '알림 서버와의 연결에 문제가 발생했습니다.',
        status: 'error',
        duration: 2000,
      });

      es.close();
    };

    return () => {
      es.close();
    };
  }, [lastEventId]);

  return <></>;
}

export default NotificationComponent;
