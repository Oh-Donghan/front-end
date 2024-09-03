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
  InputRightAddon,
  InputRightElement,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  useToast,
} from '@chakra-ui/react';
import { RiLock2Fill } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useState } from 'react';
import { IoIosEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { idDuplicateCheck, signUp } from '../../../../axios/auth/user';
import SignupEmailSection from './SignupEmailSection';

export default function SignupModal({ onClose, isOpen, initialRef }) {
  const [verificationMode, setVerificationMode] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const [show, setShow] = useState(false);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(
    '4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합',
  );
  const [idMessage, setIdMessage] = useState('6자~12자의 영문 + 숫자만 사용 가능');
  const [idMessageColor, setIdMessageColor] = useState('rgba(140,140,140,1)');
  const [passwordMessageColor, setPasswordMessageColor] = useState('rgba(140,140,140,1)');

  const [isIdConfirmed, setIsIdConfirmed] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const toast = useToast();

  const validateId = value => {
    const idPattern = /^[a-zA-Z0-9]{6,12}$/;

    if (value.length === 0) {
      setIsIdValid(true);
    } else if (!idPattern.test(value)) {
      setIsIdValid(false);
    } else if (idPattern.test(value)) {
      setIsIdValid(true);
    }
  };

  const validatePassword = value => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*()\-_=+{};:,<.>]).{4,16}$/;

    if (value.length === 0) {
      setIsPasswordValid(true);
      setPasswordMessage('4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합');
    } else if (!passwordPattern.test(value)) {
      setIsPasswordValid(false);
    } else if (passwordPattern.test(value)) {
      setIsPasswordValid(true);
    }
  };

  const validateEmail = value => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value.length === 0) {
      setIsEmailValid(true);
      return;
    }

    if (!emailPattern.test(value)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handleClose = () => {
    setIsIdValid(true);
    setIsPasswordValid(true);
    setIsPasswordConfirmed(false);
    setShow(false);
    setId('');
    setPassword('');
    setIsEmailValid(true);
    setVerificationCode('');
    setVerificationMode(false);
    setIsVerificationCodeValid(false);
    setIdMessage('6자~12자의 영문 + 숫자만 사용 가능');
    setPasswordMessage('4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합');
    setIdMessageColor('rgba(140,140,140,1)');
    setPasswordMessageColor('rgba(140,140,140,1)');
    setIsIdConfirmed(false);
    setIsPasswordConfirmed(false);
    setIsEmailConfirmed(false);
    setIsCheckBoxChecked(false);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
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
              onChange={e => {
                setId(e.target.value);
                validateId(e.target.value);
                setIsIdConfirmed(false);
                setIdMessage('6자~12자의 영문 + 숫자만 사용 가능');
                setIdMessageColor('rgba(140,140,140,1)');
              }}
              focusBorderColor={`${isIdValid ? 'rgba(0, 119, 255, 0.9)' : 'rgba(255, 0, 0, 0.8)'}`}
            />
            <InputRightAddon
              fontSize={'xs'}
              cursor={'pointer'}
              border={'1px solid rgba(200,200,200,1)'}
              onClick={async () => {
                if (!isIdValid || id.trim().length === 0) {
                  return;
                }
                try {
                  const response = await idDuplicateCheck({ id });
                  setIdMessage(response);
                  setIdMessageColor('rgba(0, 119, 255, 0.9)');
                  if (response === '사용 가능한 아이디 입니다.') {
                    setIsIdConfirmed(true);
                  } else if (response === '이미 존재하는 아이디입니다. ') {
                    setIsIdConfirmed(false);
                    toast({
                      title: '이미 존재하는 아이디입니다.',
                      status: 'error',
                      duration: 1300,
                    });
                  }
                } catch (error) {
                  console.error('아이디 중복 확인 오류 :' + error);
                }
              }}
            >
              중복확인
            </InputRightAddon>
          </InputGroup>
          <Text
            fontSize={'xs'}
            color={isIdValid ? idMessageColor : 'red'}
            marginLeft={'6px'}
            marginBottom={'14px'}
          >
            {idMessage}
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RiLock2Fill color="rgba(180,180,180,1)" />
            </InputLeftElement>
            <Input
              borderColor={'rgba(200,200,200,1)'}
              type="password"
              placeholder="비밀번호"
              fontSize={'0.95rem'}
              onChange={e => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              focusBorderColor={`${isPasswordValid ? 'rgba(0, 119, 255, 0.9)' : 'rgba(255, 0, 0, 0.8)'}`}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaCheck
                size={13}
                color={
                  password.length > 0 && isPasswordValid
                    ? 'rgba(180,180,180,1)'
                    : 'rgba(210,210,210,1)'
                }
                cursor={password.length > 0 && isPasswordValid ? 'pointer' : ''}
              />
            </InputLeftElement>
            <Input
              disabled={password.length > 0 && isPasswordValid ? false : true}
              borderColor={'rgba(200,200,200,1)'}
              type={show ? 'text' : 'password'}
              placeholder="비밀번호 확인"
              fontSize={'0.95rem'}
              onChange={e => {
                setConfirmPassword(e.target.value);
                if (e.target.value.length === 0) {
                  setPasswordMessageColor('rgba(140,140,140,1)');
                  setPasswordMessage(
                    '4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합',
                  );
                  return;
                }

                if (e.target.value === password) {
                  setIsPasswordConfirmed(true);
                  setPasswordMessageColor('rgba(0, 119, 255, 0.9)');
                  setPasswordMessage('비밀번호가 일치합니다.');
                } else {
                  setIsPasswordConfirmed(false);
                  setPasswordMessage('비밀번호가 일치하지 않습니다.');
                }
              }}
              focusBorderColor={`${isPasswordConfirmed ? 'rgba(0, 119, 255, 0.9)' : 'rgba(255, 0, 0, 0.8)'}`}
            />
            <InputRightElement marginRight={'4px'}>
              {show ? (
                <IoIosEye
                  color={
                    password.length > 0 && isPasswordValid
                      ? 'rgba(180,180,180,1)'
                      : 'rgba(210,210,210,1)'
                  }
                  size={20}
                  cursor={password.length > 0 && isPasswordValid ? 'pointer' : ''}
                  onClick={() => {
                    if (password.length > 0 && isPasswordValid) setShow(false);
                  }}
                />
              ) : (
                <IoIosEyeOff
                  color={
                    password.length > 0 && isPasswordValid
                      ? 'rgba(180,180,180,1)'
                      : 'rgba(210,210,210,1)'
                  }
                  size={20}
                  cursor={password.length > 0 && isPasswordValid ? 'pointer' : ''}
                  onClick={() => {
                    if (password.length > 0 && isPasswordValid) setShow(true);
                  }}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Text
            fontSize={'xs'}
            color={!isPasswordValid ? 'red' : passwordMessageColor}
            marginLeft={'6px'}
            marginBottom={'16px'}
          >
            {passwordMessage}
          </Text>

          {/* 이메인 인증 및 인증 코드 적는 섹션 */}
          <SignupEmailSection
            verificationMode={verificationMode}
            validateEmail={validateEmail}
            setEmail={setEmail}
            isEmailValid={isEmailValid}
            email={email}
            setVerificationMode={setVerificationMode}
            setVerificationCode={setVerificationCode}
            verificationCode={verificationCode}
            setIsVerificationCodeValid={setIsVerificationCodeValid}
            isVerificationCodeValid={isVerificationCodeValid}
            setIsEmailConfirmed={setIsEmailConfirmed}
          />

          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Checkbox
              fontSize="18px"
              marginTop={'14px'}
              isChecked={isCheckBoxChecked}
              onChange={() => {
                setIsCheckBoxChecked(prev => !prev);
              }}
            >
              <Flex alignItems={'center'}>
                <Text fontSize="sm" color={'rgba(100,100,100,1)'}>
                  약관 동의
                </Text>
                <Text fontSize="xs" color={'rgb(241, 63, 63)'} marginLeft={'2px'}>
                  *필수
                </Text>
              </Flex>
            </Checkbox>
            <Popover trigger="hover">
              <PopoverTrigger>
                <Text
                  cursor={'pointer'}
                  fontSize={'0.75rem'}
                  color={'rgba(140,140,140,1)'}
                  paddingTop={'12px'}
                >
                  내용 보기
                </Text>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold" fontSize={'0.95rem'}>
                  약관내용
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody fontSize={'0.75rem'} lineHeight={'26px'} padding={'14px'}>
                  <Text>
                    제1조(목적) 본 약관은 대·중소기업·농어업협력재단 기술보호통합포털(이하 "당
                    관리시스템")이 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와
                    당 관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로
                    합니다.
                  </Text>
                  <Text marginTop={'12px'}>
                    제2조(약관의 효력 및 변경) ① 당 관리시스템은 귀하가 본 약관 내용에 동의하는 것을
                    조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의 하는
                    경우, 당 관리시스템의 서비스 제공 행위 및 서비스 사용 행위에는 본 약관이
                    우선적으로 적용될 것입니다.
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <Button
            colorScheme="blue"
            size="md"
            marginTop={'16px'}
            onClick={async () => {
              if (!isIdConfirmed) {
                toast({
                  title: '아이디 중복 확인해 주세요.',
                  duration: 1300,
                  status: 'error',
                });
                return;
              } else if (!isPasswordConfirmed) {
                toast({
                  title: '비밀번호를 확인해 주세요.',
                  duration: 1300,
                  status: 'error',
                });
                return;
              } else if (!isEmailConfirmed) {
                toast({
                  title: '이메일 인증을 완료해 주세요.',
                  duration: 1300,
                  status: 'error',
                });
                return;
              } else if (!isCheckBoxChecked) {
                toast({
                  title: '약관을 동의해 주세요.',
                  duration: 1300,
                  status: 'error',
                });
                return;
              }

              try {
                const response = await signUp({
                  email,
                  id,
                  password,
                  confirmPassword,
                  authNum: verificationCode,
                });

                if (response === '회원가입이 완료되었습니다.') {
                  handleClose();
                  toast({
                    title: response,
                    duration: 1300,
                    status: 'success',
                  });
                }

                if (response === '이미 존재하는 이메일입니다.') {
                  handleClose();
                  toast({
                    title: response,
                    duration: 1300,
                    status: 'error',
                  });
                }
              } catch (error) {
                console.error('회입가입 오류' + error);
              }
            }}
          >
            가입하기
          </Button>

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
                카카오로 가입하기
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
                네이버로 가입하기
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
                구글로 가입하기
              </Button>
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
