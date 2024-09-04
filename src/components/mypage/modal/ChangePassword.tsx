import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { fetchChangePassword } from '../../../axios/mypage/changepassword';
import { useQuery } from '@tanstack/react-query';
import { fetchMemberInquiry } from '../../../axios/mypage/memberinquiry';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../../axios/auth/user';

export default function ChangePassword({ onClose, isOpen, initialRef }) {
  const toast = useToast();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['memberInquiry'],
    queryFn: fetchMemberInquiry,
  });

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const handleClick = () => setShow(!show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [id]: value, // id를 키로 사용하여 해당 입력 필드의 값을 업데이트
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

    try {
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
        // 로컬스토리지에서 accessToken과 memberId 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('memberId');

        handleReset();
        handleSignOut();
        // 홈으로 이동하고 새로고침
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        toast({
          title: '비밀번호 변경 실패.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      toast({
        title: error.response.data,
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
        {data?.social === null ? (
          <>
            <ModalHeader fontSize={'2xl'} textAlign={'center'}>
              비밀번호 변경
            </ModalHeader>
            <Flex justifyContent="flex-end">
              <Button mr="24px" onClick={handleClick}>
                {show ? '숨기기' : '보이기'}
              </Button>
            </Flex>
            <ModalBody>
              <FormControl>
                <Stack spacing={2}>
                  <FormLabel htmlFor="currentPassword" margin={0}>
                    현재 비밀번호
                  </FormLabel>
                  <Flex justifyContent="flex-end"></Flex>
                  <Input
                    id="currentPassword"
                    type={show ? 'text' : 'password'}
                    ref={initialRef}
                    value={passwords.currentPassword}
                    onChange={handleChange}
                  />
                  <FormLabel htmlFor="newPassword" margin={0}>
                    변경할 비밀번호
                  </FormLabel>
                  <Input
                    id="newPassword"
                    type={show ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={handleChange}
                  />
                  <FormLabel htmlFor="confirmPassword" margin={0}>
                    한번 더 입력
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    type={show ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                  />
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
          </>
        ) : (
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="xl" fontWeight="bold">
                  비밀번호 변경 불가 안내
                </AlertDialogHeader>

                <AlertDialogBody fontSize="lg">
                  소셜 로그인 계정은 비밀번호 변경이 불가능합니다.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose} colorScheme="blue">
                    확인
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </ModalContent>
    </Modal>
  );
}
