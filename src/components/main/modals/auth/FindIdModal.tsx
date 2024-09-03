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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={4}>아이디 찾기</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input
                placeholder="이메일을 입력해 주세요."
                defaultValue={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <Text>{id !== '' ? id : ''}</Text>
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
