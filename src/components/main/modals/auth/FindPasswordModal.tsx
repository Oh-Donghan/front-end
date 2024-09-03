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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={4}>비밀번호 찾기</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>아이디</FormLabel>
              <Input
                placeholder="아이디를 입력해 주세요."
                defaultValue={memberId}
                onChange={e => {
                  setMemberId(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                placeholder="이메일을 입력해 주세요."
                defaultValue={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <Text>{password !== '' ? password : ''}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmit}>
              전송
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
