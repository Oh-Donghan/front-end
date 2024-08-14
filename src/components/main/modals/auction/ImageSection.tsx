import { Flex, Text, IconButton, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { IoClose } from 'react-icons/io5';

interface ImageSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles?: number;
}

export default function ImageSection({ files, setFiles, maxFiles = 6 }: ImageSectionProps) {
  const toast = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxFiles || acceptedFiles.length + files.length > maxFiles) {
      toast({
        title: `최대 ${maxFiles}개의 파일만 첨부할 수 있습니다.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles,
  });

  return (
    <Flex direction="column" width="full">
      <Flex alignItems="center" marginBottom="4px">
        <Text fontSize={16} fontWeight="semibold">
          상품 이미지
        </Text>
        <Text fontSize={14} color="red" marginLeft={1}>
          *필수
        </Text>
        <Text fontSize={14} color="rgba(150,150,150,1)" marginLeft={1}>
          (최소 1개 최대 {maxFiles}개)
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
        {files.map((file, index) => (
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
              icon={<IoClose size={17} />}
              size="xs"
              position="absolute"
              top="4px"
              right="4px"
              onClick={() => removeFile(file)}
              aria-label="Remove Image"
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
