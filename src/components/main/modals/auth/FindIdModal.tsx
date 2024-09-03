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
import { FindId } from '../../../../axios/auth/user';

export default function FindIdModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const onSubmit = async () => {
    try {
      const response = await FindId({ email });
      setId(response);
    } catch (error) {
      console.error(`find id error: ${error}`);
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
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <Text mt={4}>{id !== '' ? `아이디: ${id}` : ''}</Text>
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
