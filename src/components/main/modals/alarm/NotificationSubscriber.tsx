import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function NotificationSubscriber({ lastEventId }) {
  const [, setEventSource] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // 실제 토큰으로 대체

    // URL에 쿼리 파라미터로 토큰과 마지막 이벤트 ID를 추가
    const url = `/api/members/notifications/subscribe?Authorization=${encodeURIComponent(`Bearer ${token}`)}&Last-Event-ID=${encodeURIComponent(lastEventId)}`;

    // EventSource 초기화
    const es = new EventSource(url);

    es.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log('New notification:', data);

      toast({
        title: '새 알림',
        description: data.message,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    };

    es.onerror = error => {
      console.error('SSE connection error:', error);
      toast({
        title: '연결 오류',
        description: '알림 서버와의 연결에 문제가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      es.close();
    };

    setEventSource(es);

    return () => {
      es.close();
    };
  }, []);

  return <></>;
}
