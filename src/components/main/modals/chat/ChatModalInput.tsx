import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

export default function ChatModalInput({ onSearch }) {
  return (
    <InputGroup>
      <InputLeftElement>
        <IoSearch color="rgba(190,190,190,1)" size={20} />
      </InputLeftElement>
      <Input
        placeholder="경매방 이름으로 검색해주세요"
        fontSize={'1rem'}
        onChange={e => onSearch(e.target.value)} // 입력 값 변경 시 onSearch 호출
      />
    </InputGroup>
  );
}
