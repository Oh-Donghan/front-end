import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteMyQnA } from '../../../../axios/mypage/deletemyqna';

export default function DeleteMyQnA({ onClose, isOpen, initialRef, askId }) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => fetchDeleteMyQnA(askId),
    onSuccess: () => {
      toast({
        title: '질문이 삭제되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['myQnA'] }); // 데이터 갱신
      onClose(); // 모달 닫기
    },
    onError: error => {
      toast({
        title: '질문 삭제에 실패했습니다.',
        description: error?.message || '알 수 없는 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>질문 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>질문을 삭제 하시겠습니까?</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleDelete}>
            삭제
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
