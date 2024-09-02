import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDeleteAccount } from '../../../axios/mypage/deleteaccount';
import { signOut } from '../../../axios/auth/user';

export default function DeleteAccount({ onClose, isOpen, initialRef }) {
  const [reason, setReason] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (reason === '') {
      toast({
        title: '탈퇴 사유를 선택해주세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetchDeleteAccount(reason);

      if (response) {
        toast({
          title: '탈퇴가 성공적으로 완료되었습니다.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // 로컬스토리지에서 accessToken과 memberId 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('memberId');

        handleSignOut();
        // 홈으로 이동하고 새로고침
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        toast({
          title: '탈퇴에 실패했습니다. 다시 시도해주세요.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: '탈퇴 중 오류가 발생했습니다.',
        description: '다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
          회원 탈퇴
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Stack spacing={3}>
              <FormLabel htmlFor="reason" margin={0}>
                탈퇴 이유를 알려주세요
              </FormLabel>
              <Select
                id="reason"
                ref={initialRef}
                placeholder="이유를 선택해주세요."
                value={reason}
                onChange={e => setReason(e.target.value)}
              >
                <option value="privacy">개인정보 보호</option>
                <option value="service">서비스 불만</option>
                <option value="other">기타</option>
              </Select>
              <UnorderedList className="text-xs">
                <ListItem>현재 사용 중인 계정 정보는 회원 탈퇴 후 복구가 불가합니다.</ListItem>
                <ListItem>
                  진행 중인 거래건이 있거나 페널티 조치 중인 경우 탈퇴 신청이 불가합니다.
                </ListItem>
                <ListItem>
                  탈퇴 후 회원님의 정보는 전자상거래 소비자보호법에 의거한 개인정보처리방침에 따라
                  관리됩니다.
                </ListItem>
              </UnorderedList>
              <Checkbox
                className="text-xs"
                isChecked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}
              >
                주의사항을 모두 확인하였습니다.
              </Checkbox>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter className="flex gap-4">
          <Button className="w-full" bgColor={'white'} onClick={onClose}>
            취소
          </Button>
          <Button
            className="w-full"
            onClick={handleSubmit}
            isDisabled={!isChecked}
            colorScheme="red"
          >
            탈퇴
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
