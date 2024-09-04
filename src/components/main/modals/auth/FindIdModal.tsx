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
import { FindId } from '../../../../axios/auth/user';

export default function FindIdModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    if (email.trim() === '') {
      toast({
        title: '이메일을 입력해 주세요.',
        duration: 1300,
        status: 'error',
      });
      return;
    }

    setIsLoading(true); // 로딩 상태 시작
    try {
      const response = await FindId({ email });
      setId(response);
      toast({
        title: `회원님의 아이디는 ${response} 입니다.`,
        duration: null,
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.response?.data || '아이디 재발급에 실패했습니다.',
        duration: 1300,
        status: 'error',
      });
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handleClose = () => {
    // 모달이 닫힐 때 상태 초기화
    setEmail('');
    setId('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={4}>아이디 찾기</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input
                placeholder="이메일을 입력해 주세요."
                value={email} // defaultValue에서 value로 변경
                borderColor={'rgba(200,200,200,1)'}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit} disabled={loading}>
              {loading ? <Spinner size={'md'} /> : '전송'}
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
