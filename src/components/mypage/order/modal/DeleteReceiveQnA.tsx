import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteAnswerQnA } from '../../../../axios/mypage/deleteanswerqna';

export default function DeleteReceiveQnA({ onClose, isOpen, initialRef, answerId }) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => fetchDeleteAnswerQnA(answerId),
    onSuccess: () => {
      toast({
        title: '답변이 삭제되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['receiveQnA'] }); // 데이터 갱신
      onClose(); // 모달 닫기
    },
    onError: error => {
      toast({
        title: '답변 삭제에 실패했습니다.',
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
        <ModalHeader>답변 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>답변을 삭제 하시겠습니까?</ModalBody>

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
