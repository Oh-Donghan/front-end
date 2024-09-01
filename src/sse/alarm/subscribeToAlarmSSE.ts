import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToast } from '@chakra-ui/react';

import { eventSourceState } from '../../recoil/atom/eventSourceAtom';
import { lastEventIdState } from '../../recoil/atom/lastEventIdAtom';
import { useSetRecoilState } from 'recoil';

export function subscribeToAlarmSSE(token, toast) {
  const setEventSource = useSetRecoilState(eventSourceState);
  const setLastEventId = useSetRecoilState(lastEventIdState);

  const url = `https://dddang.store/api/members/notification/subscribe`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const lastEventId = localStorage.getItem('lastEventId');
  if (lastEventId) {
    headers['Last-Event-ID'] = lastEventId;
  }

  const es = new EventSourcePolyfill(url, {
    headers,
    withCredentials: true,
  });

  es.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log('New notification:', data);

    // lastEventId를 업데이트
    setLastEventId(event.lastEventId);
    localStorage.setItem('lastEventId', event.lastEventId);

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
      description: '알림 서버와의 연결에 문제가 발생했습니다. 재시도 중...',
      status: 'error',
      duration: 2000,
    });

    // EventSource 객체를 안전하게 정리
    es.close();
    setEventSource(null);

    // 일정 시간 후 재연결 시도 (예: 5초 후)
    setTimeout(() => {
      subscribeToAlarmSSE(token, toast); // 재연결 시도
    }, 5000);
  };

  setEventSource(es);
}
