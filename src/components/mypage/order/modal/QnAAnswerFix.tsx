import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateAnswer, IUpdateAnswerDto } from '../../../../axios/mypage/fixanswer';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
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
  Text,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';

export interface IImageInfo {
  id: number;
  imageUrl: string;
  imageName: string;
  imageType: string;
  answerId?: number;
  auctionId?: number;
  createdAt: string;
}

export interface IAnswerResponse {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  imageList: IImageInfo[];
  createdAt: string;
}

export default function QnAAnswerFix({
  onClose,
  isOpen,
  initialRef,
  questionTitle,
  questionContent,
  existingAnswer,
}: {
  onClose: () => void;
  isOpen: boolean;
  initialRef: React.RefObject<HTMLInputElement>;
  questionTitle: string;
  questionContent: string;
  existingAnswer: IAnswerResponse;
}) {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [viewableImages, setViewableImages] = useState<IImageInfo[]>([]); // 추가된 상태
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const toast = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (existingAnswer) {
      setContent(existingAnswer.content);
      setViewableImages(existingAnswer.imageList);
    }
  }, [existingAnswer]);

  const updateMutation = useMutation({
    mutationFn: (updateDto: IUpdateAnswerDto) =>
      fetchUpdateAnswer(existingAnswer.id, updateDto, selectedImages),
    onSuccess: () => {
      toast({
        title: '답변이 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['receiveQnA'] });
      handleClose();
    },
    onError: error => {
      toast({
        title: '답변 수정에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error updating answer:', error);
    },
  });

  const handleSubmit = () => {
    const updateDto = {
      content,
      imageFileNameList: imagesToRemove,
    };
    updateMutation.mutate(updateDto);
  };

  const handleRemoveImage = (imageName: string) => {
    setImagesToRemove(prev => [...prev, imageName]);
    setViewableImages(prev => prev.filter(image => image.imageName !== imageName)); // UI에서 즉시 제거
  };

  const handleClose = () => {
    setSelectedImages([]);
    setImagesToRemove([]);
    setViewableImages([]); // 상태 초기화
    onClose();
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length + selectedImages.length + existingAnswer.imageList.length > 6) {
      toast({
        title: '최대 6개의 파일만 첨부할 수 있습니다.',
        status: 'error',
        duration: 1300,
      });
      return;
    }
    setSelectedImages(prev => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    existingAnswer && (
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
            답변 수정하기
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
                  value={existingAnswer?.title}
                  placeholder="답변 제목을 입력하세요"
                  isDisabled
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
                <Flex direction="column" width="full">
                  <Flex alignItems="center" marginBottom="4px">
                    <Text fontSize={16} fontWeight="semibold">
                      상품 이미지
                    </Text>
                    <Text fontSize={14} color="red" marginLeft={1}>
                      *필수
                    </Text>
                    <Text fontSize={14} color="rgba(150,150,150,1)" marginLeft={1}>
                      (최소 1개 최대 6개)
                    </Text>
                  </Flex>
                  <div
                    {...getRootProps()}
                    style={{
                      border: '1px dashed rgba(140,140,140,1)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      color: 'rgba(150,150,150,1)',
                      height: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Text>여기로 파일을 드래그하세요...</Text>
                    ) : (
                      <Text>드래그 혹은 클릭하여 파일 첨부</Text>
                    )}
                  </div>
                  <Flex marginTop="10px" flexWrap="wrap" gap={2}>
                    {viewableImages.map(file => (
                      <Flex
                        key={file.id}
                        direction="column"
                        alignItems="center"
                        width="100px"
                        height="100px"
                        position="relative"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${file.imageUrl})`}
                        borderRadius="8px"
                        overflow="hidden"
                        _hover={{ opacity: 0.8 }}
                      >
                        <IconButton
                          icon={<IoClose size="17" />}
                          size="xs"
                          position="absolute"
                          top="4px"
                          right="4px"
                          onClick={() => handleRemoveImage(file.imageName)}
                          aria-label="Remove Image"
                        />
                      </Flex>
                    ))}
                    {selectedImages.map((file, index) => (
                      <Flex
                        key={index}
                        direction="column"
                        alignItems="center"
                        width="100px"
                        height="100px"
                        position="relative"
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundImage={`url(${URL.createObjectURL(file)})`}
                        borderRadius="8px"
                        overflow="hidden"
                        _hover={{ opacity: 0.8 }}
                      >
                        <IconButton
                          icon={<IoClose size="17" />}
                          size="xs"
                          position="absolute"
                          top="4px"
                          right="4px"
                          onClick={() =>
                            setSelectedImages(prev => prev.filter((_, i) => i !== index))
                          }
                          aria-label="Remove Image"
                        />
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Button colorScheme="blue" onClick={handleSubmit} w="full">
                수정하기
              </Button>
              <Button onClick={handleClose} w="full" bg="white">
                취소
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
}
