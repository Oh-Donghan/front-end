import {
  InputGroup,
  Stack,
  Input as MainInput,
  Box,
  InputLeftAddon,
  InputRightElement,
  Button,
  useToast,
  Spinner,
} from '@chakra-ui/react';
// import axios from 'axios';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Input() {
  const { register, handleSubmit, formState } = useForm();
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

    navigate(`/auctions?word=${data.search}`);

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
      <Box display="flex" justifyContent="center" className="mt-10 sm:mt-[62px]">
        <Stack spacing={4} width={'88%'} maxWidth={'600px'}>
          <InputGroup>
            <InputLeftAddon borderColor="gray.300">
              {' '}
              <IoSearch color="rgba(190,190,190,1)" size={20} />
            </InputLeftAddon>
            <MainInput
              type="search"
              placeholder="상품명으로 검색해주세요."
              fontSize={'1rem'}
              borderColor="gray.300"
              {...register('search')}
              disabled={formState.isSubmitting}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                color={'rgba(130,130,130,1)'}
                disabled={formState.isSubmitting}
                type="submit"
              >
                {formState.isSubmitting ? <Spinner size="sm" /> : 'enter'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
    </form>
  );
}
