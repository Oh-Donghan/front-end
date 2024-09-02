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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { fetchChangePassword } from '../../../axios/mypage/changepassword';

export default function ChangePassword({ onClose, isOpen, initialRef }) {
  const toast = useToast();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [id]: value, // id를 키로 사용하여 해당 입력 필드의 값을 업데이트
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Current Password:', passwords.currentPassword);
    console.log('New Password:', passwords.newPassword);
    console.log('Confirm Password:', passwords.confirmPassword);
    // 여기에 비밀번호 변경 로직을 추가하세요.
    if (
      passwords.currentPassword === '' ||
      passwords.newPassword === '' ||
      passwords.confirmPassword === ''
    ) {
      toast({
        title: '양식을 전부 채워주세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (passwords.currentPassword === passwords.newPassword) {
      toast({
        title: '변경할 비밀번호가 현재 비밀번호와 동일합니다.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: '변경할 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const response = await fetchChangePassword({
      curPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword,
    });

    if (response) {
      toast({
        title: '비밀번호가 변경 되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      handleReset();
    } else {
      toast({
        title: '비밀번호 변경 실패.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    onClose();
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
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
              <FormLabel htmlFor="currentPassword" margin={0}>
                현재 비밀번호
              </FormLabel>
              <Input
                id="currentPassword"
                ref={initialRef}
                value={passwords.currentPassword}
                onChange={handleChange}
              />
              <FormLabel htmlFor="newPassword" margin={0}>
                변경할 비밀번호
              </FormLabel>
              <Input id="newPassword" value={passwords.newPassword} onChange={handleChange} />
              <FormLabel htmlFor="confirmPassword" margin={0}>
                한번 더 입력
              </FormLabel>
              <Input
                id="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
              <span className="text-xs">
                4자 ~ 16자 이내의 숫자, 특수문자, 영문자 중 2가지 이상을 조합
              </span>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter className="flex gap-4">
          <Button className="w-full" colorScheme="blue" onClick={handleSubmit}>
            변경
          </Button>
          <Button className="w-full" bgColor={'white'} onClick={handleReset}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
