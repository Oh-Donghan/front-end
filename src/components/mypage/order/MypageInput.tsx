import {
  InputGroup,
  Stack,
  Input,
  Box,
  InputLeftAddon,
  InputRightElement,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';

export default function MypageInput({ setSearchWord, onSearch }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const toast = useToast();

  const onSubmit = data => {
    const trimmedSearch = data.search.trim();

    if (trimmedSearch === '') {
      toast({
        title: '검색어를 입력해 주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSearchWord(trimmedSearch); // 상위 컴포넌트의 검색어 상태를 업데이트
    onSearch(1); // 검색 시 페이지를 첫 번째 페이지로 리셋
    reset();

    // try {
    //   const res = await axios.post(
    //     '/',
    //     {
    //       search: data.search.trim(),
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer your-token-here',
    //       },
    //     },
    //   );
    //   console.log('Success:', res.data);
    // } catch (error) {
    //   console.error(`Request Error: ${error}`);
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center">
        <Stack spacing={4} width="300px">
          <InputGroup>
            <InputLeftAddon borderColor="gray.300" height="34px" padding="0 10px">
              <IoSearch color="rgba(190,190,190,1)" size={16} />
            </InputLeftAddon>
            <Input
              type="text"
              placeholder="상품명으로 검색해주세요."
              borderColor="gray.300"
              width="300px"
              height="34px"
              {...register('search')}
              disabled={formState.isSubmitting}
            />
            <InputRightElement height="34px">
              <Button
                width="20px"
                height="26px"
                marginRight={'8px'}
                color="rgba(130,130,130,1)"
                disabled={formState.isSubmitting}
                type="submit"
                fontSize="14px"
              >
                {formState.isSubmitting ? <Spinner size="sm" /> : '조회'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
    </form>
  );
}
