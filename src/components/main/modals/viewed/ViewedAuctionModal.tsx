import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import ViewedAuctionList from './ViewedAuctionList';

export default function ViewedAuctionModal() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <Box ref={initialRef} position={'relative'} zIndex={'50'}>
      <Popover
        placement="bottom-end"
        closeOnBlur={true}
        trigger={'hover'}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Box _hover={{ bgColor: 'rgba(226,232,240,1)' }} cursor={'pointer'} mx={-6} px={6} py={3}>
            최근 본 경매
          </Box>
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
            {isOpen && <ViewedAuctionList />} {/* 모달이 열릴 때만 ViewedAuctionList를 렌더링 */}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
