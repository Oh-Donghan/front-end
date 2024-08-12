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

export default function ViewedAuctionModal() {
  const initialRef = useRef(null);

  return (
    <Box ref={initialRef}>
      <Popover placement="bottom-end" closeOnBlur={true} trigger={'hover'}>
        <PopoverTrigger>
          <span>최근 본 경매</span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>최근 본 경매</PopoverHeader>
          <PopoverBody>최근 본 경매 내용</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
