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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchMyQnAFix, IUpdateQuestionDto } from '../../../../axios/mypage/myqnafix';

export default function MyQnAFix({
  onClose,
  isOpen,
  initialRef,
  questionTitle,
  questionContent,
  askId,
}) {
  const [title, setTitle] = useState(questionTitle || '');
  const [content, setContent] = useState(questionContent || '');
  const queryClient = useQueryClient();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setTitle(questionTitle);
      setContent(questionContent);
    }
  }, [isOpen, questionTitle, questionContent]);

  const mutation = useMutation({
    mutationFn: (updateDto: IUpdateQuestionDto) => fetchMyQnAFix(askId, updateDto),
    onSuccess: () => {
      toast({
        title: '질문이 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['myQnA'] }); // 수정 후 myQnA 목록을 새로고침
      onClose(); // 모달 닫기
    },
    onError: error => {
      toast({
        title: '질문 수정에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error updating question:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updateDto = {
      content,
    };
    mutation.mutate(updateDto);
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
          질문 수정하기
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Stack spacing={2}>
              <FormLabel htmlFor="title" display={'none'}>
                제목
              </FormLabel>
              <Input
                id="title"
                ref={initialRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목"
                isDisabled={true} // 제목은 수정할 수 없도록 비활성화
              />
              <FormLabel htmlFor="content" display={'none'}>
                내용
              </FormLabel>
              <div className="relative">
                <Textarea
                  id="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="글자 수 400자 제한"
                  height={'200px'}
                />
              </div>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleSubmit}>
            수정하기
          </Button>
          <Button className="w-full" bgColor={'white'} onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
