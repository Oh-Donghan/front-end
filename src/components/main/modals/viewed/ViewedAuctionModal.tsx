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
import { RefObject } from 'react';
import ViewedAuctionList from './ViewedAuctionList';

interface AlarmModalType {
  containerRef?: RefObject<HTMLDivElement>;
  type?: string;
}

export default function ViewedAuctionModal({ type }: AlarmModalType) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box>
      <Popover
        placement={type === 'drawer' ? 'end-end' : 'bottom-end'}
        closeOnBlur={true}
        trigger={'hover'}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Box
            _hover={{
              bgColor: type === 'drawer' ? 'rgba(226,232,240,1)' : 'rgba(255,255,255,1)',
            }}
            cursor={'pointer'}
            mx={-6}
            px={6}
            py={3}
          >
            최근 본 경매
          </Box>
        </PopoverTrigger>

        <PopoverContent width={['330px', '380px']}>
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
