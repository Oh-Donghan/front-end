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
} from '@chakra-ui/react';
import { useState } from 'react';
import { FindPassword } from '../../../../axios/auth/user';

export default function FindPasswordModal({ isOpen, onClose }) {
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      const response = await FindPassword({ memberId, email });
      setPassword(response);
    } catch (error) {
      console.error(`find password error: ${error}`);
    }
  };

  const handleClose = () => {
    // 모달이 닫힐 때 상태 초기화
    setMemberId('');
    setEmail('');
    setPassword('');
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
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                placeholder="이메일을 입력해 주세요."
                value={email} // defaultValue 대신 value 사용
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <Text>{password !== '' ? password : ''}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              전송
            </Button>
            <Button onClick={handleClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
