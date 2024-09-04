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
import { useState } from 'react';
import { fetchQnACreation, IQnAData } from '../../../axios/auctionDetail/qnaCreation';
import { useParams } from 'react-router-dom';

export default function QnAModal({ onClose, isOpen, initialRef }) {
  const { id: auctionId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (newQnA: IQnAData) => fetchQnACreation(newQnA.title, newQnA.content, auctionId),
    onSuccess: () => {
      toast({
        description: '작성이 완료 되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      if (auctionId) {
        // auctionId가 존재하는 경우에만 무효화 시도
        queryClient.invalidateQueries({ queryKey: ['detail', auctionId] });
      }
      // 입력 필드를 비웁니다
      setTitle('');
      setContent('');
      onClose(); // 성공 시 모달을 닫습니다.
    },
    onError: error => {
      console.error('Error creating Q&A:', error);
      // 추가적인 에러 핸들링 로직을 여기에 추가할 수 있습니다.
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate({ title, content, auctionId });
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
          질문을 적어주세요.
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
            작성하기
          </Button>
          <Button className="w-full" bgColor={'white'} onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
