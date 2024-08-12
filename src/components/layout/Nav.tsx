import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { RxTextAlignJustify } from 'react-icons/rx';
import SigninModal from '../main/modals/auth/SigninModal';
import SignupModal from '../main/modals/auth/SignupModal';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PointChargeModal from '../main/modals/point/PointChargeModal';
import AlarmModal from '../main/modals/alarm/AlarmModal';
import ViewedAuctionModal from '../main/modals/viewed/ViewedAuctionModal';

export default function Nav() {
  const signinDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();
  const pointChargeDisclosure = useDisclosure();

  const initialRef = useRef(null);
  const toast = useToast();
  const loggedIn = true;

  const handleSignupOpen = () => {
    signinDisclosure.onClose();
    signupDisclosure.onOpen();
  };

  return (
    <>
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
      <div className="flex justify-between items-center h-[90px] px-10">
        <Link to={'/'} className="text-3xl font-bold">
          Logo
        </Link>
        <RxTextAlignJustify className="lg:hidden" size={38} />
        <div className="hidden lg:block">
          <ul className="flex justify-between items-center font-semibold w-full gap-3">
            {loggedIn ? (
              <>
                <li className="mr-4 cursor-pointer">
                  <AlarmModal />
                </li>
                <li className="mr-4 cursor-pointer">
                  <ViewedAuctionModal />
                </li>
                <li className="mr-4 cursor-pointer">마이페이지</li>
                <li className="mr-4 cursor-pointer">로그아웃</li>
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
                  <Button colorScheme="blue" variant="solid">
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
                <li>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: `로그인 후 사용 가능한 서비스입니다.`,
                        position: 'top',
                        isClosable: true,
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
                        isClosable: true,
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
    </>
  );
}
