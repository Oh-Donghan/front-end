import React, { useCallback, useState } from 'react';
import {
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Input,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail, RequestAuthenticationEmailCode } from '../../../../axios/auth/user';

interface SignupEmailSectionProps {
  validateEmail: (email: string) => void;
  setEmail: (email: string) => void;
  isEmailValid: boolean;
  email: string;
  setVerificationCode: (code: string) => void;
  verificationCode: string;
  setIsVerificationCodeValid: (isValid: boolean) => void;
  isVerificationCodeValid: boolean;
  verificationMode: boolean;
  setVerificationMode: (verificationMode: boolean) => void;
  setIsEmailConfirmed: (emailConfirmed: boolean) => void;
}

export default function SignupEmailSection({
  validateEmail,
  setEmail,
  isEmailValid,
  email,
  setVerificationCode,
  verificationCode,
  setIsVerificationCodeValid,
  isVerificationCodeValid,
  verificationMode,
  setVerificationMode,
  setIsEmailConfirmed,
}: SignupEmailSectionProps) {
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (variables: { email: string }) => RequestAuthenticationEmailCode(variables),
    onSuccess: data => {
      if (data === '인증번호가 전송되었습니다.') {
        setVerificationMode(true);
      }
    },
  });

  const handleRequestVerification = useCallback(() => {
    if (email.trim().length === 0 || !isEmailValid || isPending) return;
    mutate({ email });
  }, [email, isEmailValid, isPending, mutate]);

  const handleCancelVerification = useCallback(() => {
    setVerificationMode(false);
    setVerificationCode('');
    setIsVerificationCodeValid(false);
    setVerificationError(null);
    setIsEmailConfirmed(false);
  }, [setVerificationCode, setIsVerificationCodeValid, setIsEmailConfirmed]);

  const handleVerificationCodeCheck = useCallback(async () => {
    try {
      const response = await confirmEmail({ email, authNum: verificationCode });
      if (response === true) {
        setIsVerificationCodeValid(true);
        setVerificationError(null);
        setIsEmailConfirmed(true);
      } else {
        setIsVerificationCodeValid(false);
        setVerificationError('인증번호가 일치하지 않습니다.');
      }
    } catch {
      setIsVerificationCodeValid(false);
      setVerificationError('인증 번호는 4자리 숫자여야 합니다.');
    }
  }, [email, verificationCode, setIsVerificationCodeValid]);

  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdEmail color="rgba(180,180,180,1)" />
        </InputLeftElement>
        <Input
          disabled={verificationMode}
          type="email"
          placeholder="이메일"
          fontSize={'0.95rem'}
          onChange={e => {
            validateEmail(e.target.value);
            setEmail(e.target.value);
          }}
          borderColor={'rgba(200,200,200,1)'}
          focusBorderColor={isEmailValid ? 'rgba(0, 119, 255, 0.9)' : 'rgba(255, 0, 0, 0.8)'}
        />
        <InputRightAddon
          fontSize={'xs'}
          cursor={isPending ? 'not-allowed' : 'pointer'}
          border={'1px solid rgba(200,200,200,1)'}
          onClick={handleRequestVerification}
          pointerEvents={verificationMode ? 'none' : 'auto'}
          opacity={verificationMode || isPending ? 0.5 : 1}
        >
          {isPending ? <Spinner size={'sm'} /> : verificationMode ? '전송완료' : '인증받기'}
        </InputRightAddon>
      </InputGroup>
      {!isEmailValid && email.length > 0 && (
        <Text fontSize={'0.75rem'} marginLeft={'6px'} color={'red'}>
          유효한 이메일 형식이 아닙니다.
        </Text>
      )}
      {isError && (
        <Text fontSize={'0.75rem'} marginLeft={'6px'} color={'red'}>
          인증번호 전송에 실패했습니다. 다시 시도해주세요. ({error.message})
        </Text>
      )}
      {verificationMode && (
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <RiLockPasswordFill color="rgba(180,180,180,1)" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="인증번호 4자리"
            fontSize={'0.95rem'}
            onChange={e => {
              setVerificationCode(e.target.value);
              setVerificationError(null); // 입력 중에는 에러 메시지를 숨김
            }}
            borderColor={'rgba(200,200,200,1)'}
            focusBorderColor={isEmailValid ? 'rgba(0, 119, 255, 0.9)' : 'rgba(255, 0, 0, 0.8)'}
          />
          <InputRightAddon
            fontSize={'xs'}
            cursor={'pointer'}
            border={'1px solid rgba(200,200,200,1)'}
            borderRadius={'0'}
            onClick={handleVerificationCodeCheck}
          >
            확인
          </InputRightAddon>
          <InputRightAddon
            fontSize={'xs'}
            cursor={'pointer'}
            border={'1px solid rgba(200,200,200,1)'}
            onClick={handleCancelVerification}
          >
            취소
          </InputRightAddon>
        </InputGroup>
      )}
      {verificationError && (
        <Text fontSize={'0.75rem'} marginLeft={'6px'} color={'red'}>
          {verificationError}
        </Text>
      )}
      {isVerificationCodeValid && (
        <Text fontSize={'0.75rem'} marginLeft={'6px'} color={'rgba(0, 119, 255, 0.9)'}>
          인증이 완료 되었습니다.
        </Text>
      )}
    </>
  );
}
