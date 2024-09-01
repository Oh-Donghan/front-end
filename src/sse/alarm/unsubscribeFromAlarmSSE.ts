import { eventSourceState } from '../../recoil/atom/eventSourceAtom';
import { useSetRecoilState } from 'recoil';

export function unsubscribeFromSSE() {
  const setEventSource = useSetRecoilState(eventSourceState);

  setEventSource(prevSource => {
    if (prevSource) {
      prevSource.close(); // 기존 구독이 있으면 해제
    }
    return null;
  });
}
