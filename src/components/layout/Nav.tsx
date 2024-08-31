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
} from '@chakra-ui/react';
import { RxTextAlignJustify } from 'react-icons/rx';
import SigninModal from '../main/modals/auth/SigninModal';
import SignupModal from '../main/modals/auth/SignupModal';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PointChargeModal from '../main/modals/point/PointChargeModal';
import AlarmModal from '../main/modals/alarm/AlarmModal';
import ViewedAuctionModal from '../main/modals/viewed/ViewedAuctionModal';
import CreateAuctionModal from '../main/modals/auction/CreateAuctionModal';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/atom/authAtom';
import { signOut } from '../../axios/auth/user';

export default function Nav() {
  const signinDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();
  const pointChargeDisclosure = useDisclosure();
  const createAuctionDisclosure = useDisclosure();
  const drawerDisclosure = useDisclosure();
  const [auth, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  const initialRef = useRef(null);
  const toast = useToast();

  const handleSignupOpen = () => {
    signinDisclosure.onClose();
    signupDisclosure.onOpen();
  };

  const moveToMypage = () => {
    navigate('/mypage');
  };

  return (
    <>
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
      />
      <SignupModal
        onClose={signupDisclosure.onClose}
        isOpen={signupDisclosure.isOpen}
        initialRef={initialRef}
      />

      {/* 네비게이션 바 */}
      <div className="flex justify-between items-center h-[84px] px-10 min-w-[375px] max-w-full">
        <Link to={'/'} className="text-3xl font-bold">
          Logo
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
                <li className="mr-4 cursor-pointer">
                  <AlarmModal />
                </li>
                <li className="mr-4 cursor-pointer">
                  <ViewedAuctionModal />
                </li>
                <li className="mr-4 cursor-pointer" onClick={moveToMypage}>
                  마이페이지
                </li>
                <li
                  className="mr-4 cursor-pointer"
                  onClick={async () => {
                    await setAuth(false);
                    await signOut();
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
      </div>

      {/* 드로어 */}
      <Drawer isOpen={drawerDisclosure.isOpen} placement="left" onClose={drawerDisclosure.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton marginTop={2} />
          <DrawerHeader fontSize={21}>메뉴</DrawerHeader>

          <DrawerBody>
            <ul className="flex flex-col font-semibold text-lg gap-2">
              {auth ? (
                <>
                  <li className="mb-4 cursor-pointer mt-4" onClick={drawerDisclosure.onClose}>
                    <AlarmModal />
                  </li>
                  <li className="mb-4 cursor-pointer" onClick={drawerDisclosure.onClose}>
                    <ViewedAuctionModal />
                  </li>
                  <li className="mb-4 cursor-pointer" onClick={drawerDisclosure.onClose}>
                    마이페이지
                  </li>
                  <li
                    className="mb-4 cursor-pointer"
                    onClick={async () => {
                      drawerDisclosure.onClose;
                      await setAuth(false);
                      await signOut();
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
                    className="mb-4 cursor-pointer mt-4"
                    onClick={() => {
                      signinDisclosure.onOpen();
                      drawerDisclosure.onClose();
                    }}
                  >
                    로그인
                  </li>
                  <li
                    className="mb-4 cursor-pointer"
                    onClick={() => {
                      signupDisclosure.onOpen();
                      drawerDisclosure.onClose();
                    }}
                  >
                    회원가입
                  </li>
                </>
              )}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
