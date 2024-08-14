import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import ViewedAuctionList from './ViewedAuctionList';

export default function ViewedAuctionModal() {
  const initialRef = useRef(null);

  return (
    <Box ref={initialRef}>
      <Popover placement="bottom-end" closeOnBlur={true} trigger={'hover'}>
        <PopoverTrigger>
          <span>최근 본 경매</span>
        </PopoverTrigger>
        <PopoverContent width={['280px', '380px']}>
          <PopoverArrow />
          <PopoverHeader
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            paddingY={['2', '4']}
            paddingLeft={['4', '6']}
          >
            <Text fontSize={['xs', 'sm']} color={'rgba(160,160,160,1)'} fontWeight={'normal'}>
              *최근 조회한 5개의 경매만 보관됩니다.
            </Text>
          </PopoverHeader>
          <PopoverBody padding={'0px'}>
            <ViewedAuctionList />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
