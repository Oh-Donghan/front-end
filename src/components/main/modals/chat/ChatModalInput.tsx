import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

export default function ChatModalInput() {
  return (
    <InputGroup>
      <InputLeftElement>
        <IoSearch color="rgba(190,190,190,1)" />
      </InputLeftElement>
      <Input placeholder="경매방 이름으로 검색해주세요" fontSize={'1rem'} />
    </InputGroup>
  );
}
