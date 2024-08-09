import { Button, useDisclosure } from '@chakra-ui/react';
import { RxTextAlignJustify } from 'react-icons/rx';
import SigninModal from '../main/modals/SigninModal';
import SignupModal from '../main/modals/SignupModal';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const signinDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();
  const initialRef = useRef(null);
  let loggedIn = false;

  const handleSignupOpen = () => {
    signinDisclosure.onClose();
    signupDisclosure.onOpen();
  };

  return (
    <>
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
                <li className="mr-4">알림</li>
                <li className="mr-4">최근 본 경매</li>
                <li className="mr-4">마이페이지</li>
                <li className="mr-4">로그아웃</li>
                <li>
                  <Button colorScheme="blue" variant="outline">
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
                  <Button colorScheme="blue" variant="outline">
                    포인트 충전
                  </Button>
                </li>
                <li>
                  <Button colorScheme="blue" variant="solid">
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
