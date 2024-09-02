import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Spinner,
  HStack,
  PinInput,
  PinInputField,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchSendEmailAuth } from '../../../../axios/mypage/sendemailauth';
import { fetchPinNumber } from '../../../../axios/mypage/sendPinNumber';
import { fetchChangeEmail } from '../../../../axios/mypage/changeemail';

export default function ChangeEmail({ onClose, isOpen, initialRef, memberEmail }) {
  // 이메일 인증 상태
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isAuthOk, setIsAuthOk] = useState(false);
  // 핀 인증 상태
  const [pinNumber, setPinNumber] = useState('');
  const [isPinSending, setIsPinSending] = useState(false);
  const [isPinOk, setIsPinOk] = useState(false);
  // 변경할 비밀번호 상태
  const [changedEmail, setChangedEmail] = useState('');

  const toast = useToast();
  const queryClient = useQueryClient();

  // 이메일 인증 요청
  const handleSendEmailAuth = async () => {
    if (!email) {
      toast({ title: '이메일을 입력하세요.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }

    setIsEmailSending(true); // 전송 시작
    const response = await fetchSendEmailAuth(email);
    setIsEmailSending(false); // 전송 완료

    if (response) {
      toast({
        title: '인증 이메일이 발송되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsAuthOk(true);
      setEmail('');
    } else {
      toast({
        title: '인증 이메일 발송 실패.',
        description: '이메일 발송에 실패했습니다. 다시 시도하세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 핀번호 인증 요청
  const handleSendPinNumber = async () => {
    if (!pinNumber) {
      toast({
        title: '핀 번호를 입력하세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsPinSending(true);
    const response = await fetchPinNumber(memberEmail, pinNumber);
    console.log('응답', response);
    setIsPinSending(false);

    if (response) {
      toast({
        title: '인증이 성공 되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsPinOk(true);
      setIsAuthOk(false);
    } else {
      toast({
        title: '인증이 실패 했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 이메일 변경 요청
  const { mutate } = useMutation({
    mutationFn: () => fetchChangeEmail(changedEmail, pinNumber),
    onSuccess: () => {
      toast({
        title: '이메일 변경이 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      queryClient.invalidateQueries({ queryKey: ['memberInquiry'] });
    },
    onError: error => {
      toast({
        title: '이메일 변경에 실패했습니다.',
        description: error.message || '다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleChangeEmail = () => {
    if (!changedEmail && !pinNumber) {
      toast({
        title: '이메일과 핀 번호를 입력하세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    mutate(); // 이메일 변경 요청 실행
  };

  // 취소 버튼 클릭시 모든 인풋창 비우기
  const handleReset = () => {
    setEmail('');
    setPinNumber('');
    setChangedEmail('');
    onClose();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="2xl">
          이메일 변경하기
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <Stack>
              <FormLabel htmlFor="title" hidden>
                이메일 인증
              </FormLabel>
              <InputGroup>
                <Input
                  id="title"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  colorScheme="blue"
                  placeholder="인증할 이메일을 입력하세요."
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    mr={1.5}
                    colorScheme="blue"
                    variant="outline"
                    onClick={handleSendEmailAuth}
                  >
                    {isEmailSending ? <Spinner size="sm" /> : '인증하기'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </FormControl>
          {/* 인증 번호 */}
          {isAuthOk && (
            <Flex direction="column" gap={2} mt={'20px'} alignItems="center">
              <Text fontWeight="bold" textColor="gray.600">
                인증 번호를 입력 해주세요.
              </Text>
              <HStack>
                <PinInput value={pinNumber} onChange={value => setPinNumber(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
                <Button colorScheme="blue" variant="outline" onClick={handleSendPinNumber}>
                  {isPinSending ? <Spinner size="sm" /> : '인증'}
                </Button>
              </HStack>
            </Flex>
          )}
          {/* 기존 이메일 및 변경할 이메일 */}
          {isPinOk && (
            <FormControl mt={4}>
              <FormLabel htmlFor="currentEmail">기존 이메일</FormLabel>
              <InputGroup>
                <Input id="currentEmail" value={memberEmail} isDisabled />
              </InputGroup>
              <FormLabel htmlFor="newEmail" mt={1}>
                변경할 이메일
              </FormLabel>
              <InputGroup>
                <Input
                  id="newEmail"
                  value={changedEmail}
                  onChange={e => setChangedEmail(e.target.value)}
                  placeholder="변경할 이메일을 입력하세요"
                />
              </InputGroup>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} colorScheme="blue" onClick={handleChangeEmail}>
            변경하기
          </Button>
          <Button onClick={handleReset}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
