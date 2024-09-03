import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  InputLeftElement,
  InputGroup,
  Text,
  Flex,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { RiLock2Fill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { logIn } from '../../../../axios/auth/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState } from '../../../../recoil/atom/authAtom';
import { eventSourceState } from '../../../../recoil/atom/eventSourceAtom';
import { alarmState, isNewNotificationState } from '../../../../recoil/atom/alarmAtom';
import { useEffect } from 'react';

export default function SigninModal({ onClose, isOpen, initialRef, onSignupClick }) {
  const { register, handleSubmit, reset } = useForm();
  const [auth, setAuth] = useRecoilState(authState);
  const setAlarmState = useSetRecoilState(alarmState);
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const [, setIsNewNotification] = useRecoilState(isNewNotificationState); // 추가
  const toast = useToast();

  useEffect(() => {
    if (auth) {
      const memberId = localStorage.getItem('memberId');
      const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

      if (eventSource) {
        console.log('Unsubscribed from notifications');
        eventSource.close();
        setEventSource(null);
      }

      // last-event-id를 URL의 쿼리 파라미터로 포함시킵니다.
      const url = new URL('https://dddang.store/api/members/notification/subscribe');
      if (lastEventId) {
        url.searchParams.append('lastEventId', lastEventId);
      }
      if (memberId) {
        url.searchParams.append('memberId', memberId);
      }

      const source = new EventSource(url.toString());

      source.onmessage = e => {
        if (e.data.startsWith('{')) {
          try {
            const eventData = JSON.parse(e.data);

            // 알림 상태를 업데이트
            setAlarmState(prev => [eventData, ...prev]);

            // 새로운 알림 도착 시 상태 업데이트
            setIsNewNotification(true);

            // last event id를 로컬 스토리지에 저장
            const memberId = localStorage.getItem('memberId');
            if (memberId && eventData.id) {
              localStorage.setItem(`last-event-id-${memberId}`, eventData.id.toString());
            }
          } catch (error) {
            console.error('Failed to parse event data:', error);
          }
        }
      };

      source.onerror = function (e) {
        console.error('SSE error occurred:', e);
        // source.close(); // 에러가 발생시 SSE 연결을 닫음
      };

      setEventSource(source);
      console.log('Subscribed to notifications');
    }
  }, [auth]);

  const onSubmit = async data => {
    if (data.id.trim() === '' || data.password.trim() === '') {
      return;
    }

    try {
      const response = await logIn({ id: data.id, password: data.password });

      await logIn({ id: data.id, password: data.password });

      const accessToken = localStorage.getItem('accessToken');
      const memberId = localStorage.getItem('memberId');
      // const lastEventId = localStorage.getItem(`last-event-id-${memberId}`);

      if (eventSource) {
        console.log('Unsubscribed from notifications');
        eventSource.close();
        setEventSource(null);
      }

      // const headers = {
      //   Authorization: `Bearer ${accessToken}`,
      //   ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
      // };

      // SSE 연결을 fetch로 구현 ( 연결이 끊겨도 재연결 시도 X )
      // const sseConnect = async (url, headers) => {
      //   try {
      //     const response = await fetch(url, {
      //       headers,
      //       method: 'GET',
      //     });

      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }

      //     const reader = response.body.getReader();
      //     const decoder = new TextDecoder();

      //     let buffer = '';

      //     // 새로운 EventSource 객체 생성
      //     const newEventSource = {
      //       close: () => {
      //         reader.cancel(); // SSE 연결을 수동으로 해제
      //       },
      //     };

      //     setEventSource(newEventSource);

      //     // eslint-disable-next-line no-constant-condition
      //     while (true) {
      //       const { done, value } = await reader.read();
      //       if (done) break;

      //       buffer += decoder.decode(value, { stream: true });

      //       const lines = buffer.split('\n');
      //       buffer = lines.pop() || '';

      //       for (const line of lines) {
      //         if (line.startsWith('data:')) {
      //           const eventDataString = line.replace(/^data:\s*/, '');
      //           try {
      //             const eventData = JSON.parse(eventDataString); // JSON 문자열을 객체로 변환
      //             console.log('New message:', eventData);
      //             setAlarmState(prev => [eventData, ...prev]);
      //             localStorage.setItem(`last-event-id-${memberId}`, eventData.id.toString()); // id 값을 로컬 스토리지에 저장
      //             setIsNewNotification(true); // 새로운 알림 도착 시 상태 업데이트
      //           } catch (error) {
      //             console.error('Failed to parse event data:', error);
      //           }
      //         }
      //       }
      //     }
      //   } catch (err) {
      //     console.error('SSE connection failed:', err);
      //   }
      // };

      // sseConnect('https://dddang.store/api/members/notification/subscribe', headers);

      console.log('Subscribed to notifications');

      setAuth(true);
      reset();
      onClose();
    } catch (error) {
      toast({
        title: '등록된 계정이 아닙니다.',
        duration: 1300,
        status: 'error',
      });
      console.error(error);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      isCentered
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader fontSize={'2xl'}>Logo</ModalHeader>
          <ModalCloseButton marginTop={'12px'} />
          <ModalBody pb={6} className="flex flex-col gap-2">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUser color="rgba(180,180,180,1)" size={14} />
              </InputLeftElement>
              <Input
                borderColor={'rgba(200,200,200,1)'}
                ref={initialRef}
                placeholder="아이디"
                fontSize={'0.95rem'}
                {...register('id')}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <RiLock2Fill color="rgba(180,180,180,1)" />
              </InputLeftElement>
              <Input
                borderColor={'rgba(200,200,200,1)'}
                type="password"
                placeholder="비밀번호"
                fontSize={'0.95rem'}
                {...register('password')}
              />
            </InputGroup>
            <Button colorScheme="blue" size="md" type="submit">
              로그인
            </Button>
            <Text marginTop={'8px'}>
              <Flex width={'full'} alignItems={'center'} justifyContent={'center'}>
                <Link color={'rgba(150,150,150,1)'} to="#">
                  <Text fontSize={'sm'}>아이디 찾기</Text>
                </Link>
                <span className="mx-3 text-gray-300">|</span>
                <Link color={'rgba(150,150,150,1)'} to="#">
                  <Text fontSize={'sm'}>비밀번호 찾기</Text>
                </Link>
                <span className="mx-3 text-gray-300">|</span>
                <Link color={'rgba(150,150,150,1)'} to="#" onClick={onSignupClick}>
                  <Text fontSize={'sm'}>회원가입</Text>
                </Link>
              </Flex>
            </Text>
            <Divider borderColor="rgba(190,190,190,1)" marginTop={'20px'} />
            <Flex
              direction={'column'}
              width={'full'}
              gap={'3'}
              marginTop={'20px'}
              marginBottom={'4px'}
            >
              <Link to={'https://dddang.store/oauth2/authorization/kakao'}>
                <Button
                  leftIcon={
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZ0lEQVR4nO2Zr0/DQBTHq7BgUCS9SynjH0C02cIMAoFCoxCTOP4BFJoEi5nDbAkKsyDm5mYWTMUUomYsmYX3rsdg6/rr1uu7AS/5JkvWu/tc793ru3eW9W+/wOqOc+Qzdu0x1vZt9uzZbAAag2ZS+Hsg/sNn4FlsQwZ84jjbvs2vEMhn/B3gPlSEbUUf0Bf2qR3c5/zQY/weBp2qQidOBvvEvmGM0sEbrrsHb6tTNnTKynRwzFLgYXlb8GYmVcHPBWPi2Mrgx667C530KgePT6SHLIXgcfmg4Ygc/nsSo9wu1WAHDjQKyKHjCpAt222imE0Nm6RxqjtVGWlUhYyr4Tm/oIbLPQlgjbsORahUFbAuuJLIY6ihiq4CMM8n4JkZdbIUCPg6500DYJSE7BYmUNQgqoIE8A7dp08Nsob6sALszQAQNQE7rsCMHERdM0vH4aTSCXibGUIjSRfa7E0MydGtASBKEmEUEqNTahBViQ/ZWa22tZGhFE5pP3IhfkMOVFALyZw8iYXUUAUUxk5msJkvDQDL9/Ztfr76VBbVNckBU8VYO/FM3GT7O7A5XskhkxUgY+IE0GRZxbzKRKHaUFTYMmklhoWrc9gA9sQTNTwyZLpNmsl7AIqMNYyVT1RNutRDdf7O2oVdJo9pDrMhJpal3Qssm8iZyj69QQ4GLvqIH1HsXwv4l+Upv8j7rq6HZwwsz2OSGCWKQ6zzI2x0RcVbWq6S0iwj4QsTP++mmBddna5467yrZcOVaSLFiPkvn5QW5nQbuseyr2uLFjoMz54SfLrWzSGViZSC8ZfMOypTTXuM/sv2CUL0dS1gcTFwAAAAAElFTkSuQmCC"
                      alt="Kakao"
                      width={'18'}
                      className="mr-1"
                    ></img>
                  }
                  width={'full'}
                  color={'f9e000'}
                  bg={'rgb(249, 224, 0)'}
                  _hover={{ bg: 'rgb(229, 204, 0)' }}
                  fontSize={'0.95rem'}
                >
                  카카오로 로그인
                </Button>
              </Link>
              <Link to={'https://dddang.store/oauth2/authorization/naver'}>
                <Button
                  leftIcon={<SiNaver width={'20'} className="mr-1" />}
                  width={'full'}
                  color={'white'}
                  bg={'rgba(3, 199, 90)'}
                  _hover={{ bg: 'rgb(0, 187, 83)' }}
                  fontSize={'0.95rem'}
                >
                  네이버로 로그인
                </Button>
              </Link>
              <Link to={'https://dddang.store/oauth2/authorization/google'}>
                <Button
                  shadow={'1px 1px 7px 1px rgba(0,0,0,0.1)'}
                  width={'full'}
                  bg={'white'}
                  leftIcon={
                    <img
                      src="https://cdn-front-door.elice.io/accounts/static/media/google.EOMUMwoHjh9KkTXD.svg"
                      alt="Google"
                      width={'20'}
                      className="mr-1"
                    ></img>
                  }
                  fontSize={'0.95rem'}
                >
                  구글로 로그인
                </Button>
              </Link>
            </Flex>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
}
