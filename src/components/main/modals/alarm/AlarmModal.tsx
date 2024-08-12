import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
} from '@chakra-ui/react';
import { useRef } from 'react';

export default function AlarmModal() {
  const initialRef = useRef(null);

  return (
    <Box ref={initialRef}>
      <Popover
        placement="bottom-end"
        closeOnBlur={true}
        trigger={'hover'} // hover로 Popover 트리거 설정
      >
        <PopoverTrigger>
          <span>알림</span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>알림</PopoverHeader>
          <PopoverBody>알림 내용</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
