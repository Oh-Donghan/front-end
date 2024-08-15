import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ChangePassword({ onClose, isOpen, initialRef }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('current: ', currentPassword);
    console.log('change: ', changePassword);
    console.log('confirm: ', confirmPassword);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'2xl'} textAlign={'center'}>
          비밀번호 변경
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Stack spacing={2}>
              <FormLabel htmlFor="current" margin={0}>
                현재 비밀번호
              </FormLabel>
              <Input
                id="current"
                ref={initialRef}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <FormLabel htmlFor="change" margin={0}>
                변경할 비밀번호
              </FormLabel>
              <Input
                id="change"
                ref={initialRef}
                value={changePassword}
                onChange={e => setChangePassword(e.target.value)}
              />
              <FormLabel htmlFor="confirm" margin={0}>
                한번 더 입력
              </FormLabel>
              <Input
                id="confirm"
                ref={initialRef}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span className="text-xs">
                4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합
              </span>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter className="flex gap-4">
          <Button className="w-full" bgColor={'white'} onClick={onClose}>
            취소
          </Button>
          <Button className="w-full" onClick={handleSubmit}>
            변경
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
