import { InputGroup, Stack, Input as MainInput, Box, InputLeftAddon } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

export default function Input() {
  return (
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
            borderColor="gray.300"
          />
        </InputGroup>
      </Stack>
    </Box>
  );
}
