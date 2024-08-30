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
import { useSetRecoilState } from 'recoil';
import { authState } from '../../../../recoil/atom/authAtom';

export default function SigninModal({ onClose, isOpen, initialRef, onSignupClick }) {
  const { register, handleSubmit, reset } = useForm();
  const setAuth = useSetRecoilState(authState);
  const toast = useToast();

  const onSubmit = async data => {
    if (data.id.trim() === '' || data.password.trim() === '') {
      return;
    }

    try {
      const response = await logIn({ id: data.id, password: data.password });
      if (response.accessToken) {
        setAuth(true);
        reset();
        onClose();
      }
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
