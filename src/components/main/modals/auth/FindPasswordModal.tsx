import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FindPassword } from '../../../../axios/auth/user';

export default function FindPasswordModal({ isOpen, onClose }) {
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [, setResponseMessage] = useState('');
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    if (memberId.trim() === '') {
      toast({
        title: '아이디를 입력해 주세요.',
        duration: 1300,
        status: 'error',
      });
      return;
    }
    if (email.trim() === '') {
      toast({
        title: '이메일를 입력해 주세요.',
        duration: 1300,
        status: 'error',
      });
      return;
    }

    setIsLoading(true); // 로딩 상태 시작

    try {
      const response = await FindPassword({ memberId, email });
      setResponseMessage(response);
      toast({
        title: '비밀번호가 재발급 되었습니다.',
        duration: null,
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.error(`find password error: ${error}`);
      toast({
        title: error.response?.data || '비밀번호 재발급에 실패했습니다.',
        duration: 1300,
        status: 'error',
      });
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handleClose = () => {
    // 모달이 닫힐 때 상태 초기화
    setMemberId('');
    setEmail('');
    setResponseMessage('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={4}>비밀번호 찾기</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>아이디</FormLabel>
              <Input
                placeholder="아이디를 입력해 주세요."
                value={memberId} // defaultValue 대신 value 사용
                onChange={e => setMemberId(e.target.value)}
                borderColor={'rgba(200,200,200,1)'}
                isDisabled={loading} // 로딩 중에는 입력 비활성화
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                placeholder="이메일을 입력해 주세요."
                value={email} // defaultValue 대신 value 사용
                onChange={e => setEmail(e.target.value)}
                borderColor={'rgba(200,200,200,1)'}
                isDisabled={loading} // 로딩 중에는 입력 비활성화
              />
            </FormControl>
            <Text fontSize={'0.8rem'} color={'rgba(110,110,110,1)'} mt={5} ml={1}>
              * 아이디와 이메일가 유효할 경우 해당 이메일로 임시 비밀번호 발송
            </Text>
            <Text fontSize={'0.8rem'} color={'rgba(110,110,110,1)'} mt={3} ml={1}>
              * 전달받은 임시 비밀번호는 마이페이지에서 변경 가능합니다.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit} isLoading={loading}>
              {loading ? <Spinner size={'md'} /> : '찾기'}
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
