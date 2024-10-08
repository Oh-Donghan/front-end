import {
  Button,
  useDisclosure,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Badge,
  Image,
  Flex,
} from '@chakra-ui/react';
import { RxTextAlignJustify } from 'react-icons/rx';
import SigninModal from '../main/modals/auth/SigninModal';
import SignupModal from '../main/modals/auth/SignupModal';
import FindIdModal from '../main/modals/auth/FindIdModal';
import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PointChargeModal from '../main/modals/point/PointChargeModal';
import AlarmModal from '../main/modals/alarm/AlarmModal';
import ViewedAuctionModal from '../main/modals/viewed/ViewedAuctionModal';
import CreateAuctionModal from '../main/modals/auction/CreateAuctionModal';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/atom/authAtom';
import { signOut } from '../../axios/auth/user';
import { eventSourceState } from '../../recoil/atom/eventSourceAtom';
import { isNewNotificationState } from '../../recoil/atom/alarmAtom';
import FindPasswordModal from '../main/modals/auth/FindPasswordModal';
import logo from '../../assets/logo/logo-final.png';

export default function Nav() {
  const signinDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();
  const pointChargeDisclosure = useDisclosure();
  const createAuctionDisclosure = useDisclosure();
  const findIdDisclosure = useDisclosure();
  const findPasswordDisclosure = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const [auth, setAuth] = useRecoilState(authState);
  const [eventSource, setEventSource] = useRecoilState(eventSourceState);
  const [isNewNotification, setIsNewNotification] = useRecoilState(isNewNotificationState);

  const navigate = useNavigate();
  const initialRef = useRef(null);
  const toast = useToast();

  const unSubscribeAlarmSSE = () => {
    if (eventSource) {
      try {
        eventSource.close(); // SSE 연결 닫기
        console.log('Unsubscribed from notifications');
      } catch (error) {
        console.error('Failed to unsubscribe from notifications:', error);
      } finally {
        setEventSource(null);
      }
    }
  };

  const handleSignupOpen = () => {
    signinDisclosure.onClose();
    signupDisclosure.onOpen();
  };

  const handleFindIdOpen = () => {
    signinDisclosure.onClose();
    findIdDisclosure.onOpen();
  };

  const handleFindPasswordOpen = () => {
    signinDisclosure.onClose();
    findPasswordDisclosure.onOpen();
  };

  const handleAlarmModalOpen = () => {
    const memberId = localStorage.getItem('memberId');

    if (isNewNotification) {
      localStorage.removeItem(`last-event-id-${memberId}`);
    }
    setIsNewNotification(false); // 알림 확인 시 빨간 점 사라지게 설정
  };

  useEffect(() => {
    console.log(isNewNotification);
  }, [isNewNotification]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && drawerDisclosure.isOpen) {
        drawerDisclosure.onClose();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawerDisclosure]);

  return (
    <>
      <FindIdModal onClose={findIdDisclosure.onClose} isOpen={findIdDisclosure.isOpen} />
      <FindPasswordModal
        onClose={findPasswordDisclosure.onClose}
        isOpen={findPasswordDisclosure.isOpen}
      />

      <CreateAuctionModal
        onClose={createAuctionDisclosure.onClose}
        isOpen={createAuctionDisclosure.isOpen}
      />

      <PointChargeModal
        onClose={pointChargeDisclosure.onClose}
        isOpen={pointChargeDisclosure.isOpen}
      />
      <SigninModal
        onClose={signinDisclosure.onClose}
        isOpen={signinDisclosure.isOpen}
        initialRef={initialRef}
        onSignupClick={handleSignupOpen}
        onFindIdClick={handleFindIdOpen}
        onFindPasswordClick={handleFindPasswordOpen}
      />
      <SignupModal
        onClose={signupDisclosure.onClose}
        isOpen={signupDisclosure.isOpen}
        initialRef={initialRef}
      />
      <Flex
        justifyContent={'space-between'}
        align={'center'}
        h={'84px'}
        px={10}
        minW={'375px'}
        maxW={'full'}
        zIndex={2000}
      >
        <Link to={'/'}>
          <Image src={logo} alt="로고 이미지" h="75px" />
        </Link>
        <RxTextAlignJustify
          className="lg:hidden cursor-pointer"
          size={38}
          onClick={drawerDisclosure.onOpen}
        />
        <div className="hidden lg:block">
          <ul className="flex justify-between items-center font-semibold w-full gap-3">
            {auth ? (
              <>
                <li className="relative mr-4 cursor-pointer">
                  <AlarmModal type="button" onOpen={handleAlarmModalOpen} />
                  {isNewNotification && (
                    <Badge
                      bgColor={'rgba(228, 25, 18)'}
                      position="absolute"
                      top="11px"
                      right="-6px"
                      borderRadius="full"
                      width="8px"
                      height="8px"
                      display="inline-block"
                    />
                  )}
                </li>
                <li className="mr-4 cursor-pointer">
                  <ViewedAuctionModal />
                </li>
                <li
                  className="mr-4 cursor-pointer"
                  onClick={() => {
                    navigate('/mypage');
                  }}
                >
                  마이페이지
                </li>
                <li
                  className="mr-4 cursor-pointer"
                  onClick={async () => {
                    unSubscribeAlarmSSE();
                    drawerDisclosure.onClose();

                    await setAuth(false);
                    await signOut();
                    unSubscribeAlarmSSE();
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('memberId');
                  }}
                >
                  로그아웃
                </li>
                <li>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={pointChargeDisclosure.onOpen}
                  >
                    포인트 충전
                  </Button>
                </li>
                <li>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={createAuctionDisclosure.onOpen}
                  >
                    경매 만들기
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="mr-4 cursor-pointer" onClick={signinDisclosure.onOpen}>
                  로그인
                </li>
                <li className="mr-4 cursor-pointer" onClick={signupDisclosure.onOpen}>
                  회원가입
                </li>
                <li className="mr-4 cursor-pointer">
                  <ViewedAuctionModal />
                </li>
                <li>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: `로그인 후 사용 가능한 서비스입니다.`,
                        position: 'top',
                        duration: 1300,
                      });
                    }}
                  >
                    포인트 충전
                  </Button>
                </li>
                <li>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => {
                      toast({
                        title: `로그인 후 사용 가능한 서비스입니다.`,
                        position: 'top',
                        duration: 1300,
                      });
                    }}
                  >
                    경매 만들기
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </Flex>
      {/* 드로어 */}
      <Box>
        <Drawer
          isOpen={drawerDisclosure.isOpen}
          placement="left"
          onClose={drawerDisclosure.onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton marginTop={2} />
            <DrawerHeader fontSize={22} fontWeight={'bold'}>
              Logo
            </DrawerHeader>

            <DrawerBody>
              <ul className="flex flex-col font-semibold text-lg">
                {auth ? (
                  <>
                    <AlarmModal
                      type={'drawer'}
                      onOpen={handleAlarmModalOpen}
                      isNewNotification={isNewNotification}
                    />

                    <ViewedAuctionModal type={'drawer'} />
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={() => {
                        navigate('/mypage');
                        drawerDisclosure.onClose();
                      }}
                    >
                      마이페이지
                    </li>
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={pointChargeDisclosure.onOpen}
                    >
                      포인트 충전
                    </li>
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={createAuctionDisclosure.onOpen}
                    >
                      경매 만들기
                    </li>
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={async () => {
                        drawerDisclosure.onClose();
                        unSubscribeAlarmSSE();

                        await setAuth(false);
                        await signOut();
                        unSubscribeAlarmSSE();
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('memberId');
                      }}
                    >
                      로그아웃
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={() => {
                        signinDisclosure.onOpen();
                        drawerDisclosure.onClose();
                      }}
                    >
                      로그인
                    </li>
                    <li
                      className="cursor-pointer -mx-6 px-6 py-3 hover:bg-[rgba(226,232,240,1)]"
                      onClick={() => {
                        signupDisclosure.onOpen();
                        drawerDisclosure.onClose();
                      }}
                    >
                      회원가입
                    </li>
                    <ViewedAuctionModal type={'drawer'} />
                  </>
                )}
              </ul>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}
