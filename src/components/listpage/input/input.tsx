import {
  InputGroup,
  Stack,
  Input as MainInput,
  Box,
  InputLeftAddon,
  useToast,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Input() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async data => {
    if (data.search.trim() === '') {
      toast({
        title: '검색어를 입력해 주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 현재 URL에 word 파라미터를 추가하여 navigate
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('word', data.search);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;

    navigate(newUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <Stack
          spacing={4}
          width={{ base: '90%', md: '40%' }}
          minWidth={{ base: '100%', lg: '400px' }}
        >
          <InputGroup size={'sm'}>
            <InputLeftAddon
              borderColor="gray.300"
              borderTopLeftRadius={'6px'}
              borderBottomLeftRadius={'6px'}
            >
              {' '}
              <IoSearch color="rgba(190,190,190,1)" size={20} />
            </InputLeftAddon>
            <MainInput
              borderRadius={'8px'}
              size={'sm'}
              type="search"
              placeholder="상품명으로 검색해주세요."
              fontSize={'0.95rem'}
              borderColor="rgba(210,210,210,1)"
              {...register('search')}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.35rem"
                w={'50px'}
                ml={2}
                size="sm"
                color={'rgba(130,130,130,1)'}
                type="submit"
                fontSize={'0.8rem'}
              >
                {'enter'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
    </form>
  );
}
