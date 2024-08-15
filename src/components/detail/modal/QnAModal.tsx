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
} from '@chakra-ui/react';
import { useState } from 'react';

export default function QnAModal({ onClose, isOpen, initialRef }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Title: ', title);
    console.log('Content: ', content);
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
                <div className="absolute bottom-2 right-2 z-20">
                  <label htmlFor="attachFile">이미지</label>
                  <input id="attachFile" type="file" accept="image/*" className="hidden" />
                </div>
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
