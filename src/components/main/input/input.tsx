import {
  InputGroup,
  Stack,
  Input as MainInput,
  Box,
  InputLeftAddon,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

export default function Input() {
  return (
    <Box display="flex" justifyContent="center" className="mt-10 sm:mt-[62px]">
      <Stack
        spacing={4}
        width={{ base: '87%', md: '30%' }}
        minWidth={{ base: '20px', md: '430px' }}
      >
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
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" color={'rgba(130,130,130,1)'}>
              enter
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </Box>
  );
}
