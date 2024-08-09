import { InputGroup, InputLeftElement, Stack, Input as MainInput, Box } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

export default function Input() {
  return (
    <Box display="flex" justifyContent="center" className="mt-10 sm:mt-14">
      <Stack spacing={4} width={{ base: '90%', md: '40%' }} minWidth={'430px'}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoSearch color="rgba(190,190,190,1)" size={20} />
          </InputLeftElement>
          <MainInput
            type="search"
            placeholder="상품명으로 검색해주세요."
            fontSize={'1rem'}
            borderColor="gray.400"
          />
        </InputGroup>
      </Stack>
    </Box>
  );
}
