import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
  Input,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCreateAnswer, ICreateAnswerDto } from '../../../../axios/mypage/createanswer';
import ImageSection from '../../../../components/main/modals/auction/ImageSection';

export default function QnAAnswer({
  onClose,
  isOpen,
  initialRef,
  questionTitle,
  questionContent,
  auctionId,
  askId,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const toast = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (createDto: ICreateAnswerDto) => fetchCreateAnswer(createDto, selectedImages),
    onSuccess: () => {
      toast({
        title: '답변이 작성되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // 필요에 따라 myQnA 또는 receiveQnA를 무효화
      queryClient.invalidateQueries({ queryKey: ['receiveQnA'] });
      handleClose();
    },
    onError: error => {
      toast({
        title: '답변 작성에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error creating answer:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const createDto = {
      title: title || questionTitle,
      content,
      auctionId,
      askId,
    };
    createMutation.mutate(createDto);
  };

  const handleClose = () => {
    setSelectedImages([]);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      preserveScrollBarGap={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'2xl'} textAlign={'center'}>
          답글을 적어주세요
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <Stack spacing={2}>
              <Box border="1px" borderColor="slate.200" rounded="md" p={4} bg="slate.50">
                <div>Q: {questionTitle}</div>
                <div>{questionContent}</div>
              </Box>
              <FormLabel htmlFor="title" hidden>
                답변 제목
              </FormLabel>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="답변 제목을 입력하세요"
              />
              <FormLabel htmlFor="content" hidden>
                답변 내용
              </FormLabel>
              <Textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="글자 수 400자 제한"
                height={'200px'}
              />
              <ImageSection files={selectedImages} setFiles={setSelectedImages} maxFiles={6} />
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack w="100%">
            <Button colorScheme="blue" onClick={handleSubmit} w="full">
              작성하기
            </Button>
            <Button onClick={handleClose} w="full" bg="white">
              취소
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
