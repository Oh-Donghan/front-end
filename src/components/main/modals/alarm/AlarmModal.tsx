import React, { RefObject, useState } from 'react';
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
import AlarmList from './AlarmList';

interface AlarmModalType {
  containerRef?: RefObject<HTMLDivElement>;
  type?: string;
  onOpen?: () => void; // 추가
}

export default function AlarmModal({ type, onOpen }: AlarmModalType) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) {
      onOpen(); // 알림 확인 시 호출
    }
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Box>
      <Popover
        placement={type === 'drawer' ? 'end-end' : 'bottom-end'}
        closeOnBlur={true}
        trigger={'hover'}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
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
            알림
          </Box>
        </PopoverTrigger>

        <PopoverContent minWidth={'600px'}>
          <PopoverArrow />
          <PopoverHeader
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            paddingY={4}
            paddingLeft={6}
            bgColor={'rgba(255,255,255,1)'}
          >
            <Text fontSize={'15px'} color={'rgba(160,160,160,1)'} fontWeight={'normal'}>
              *최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.
            </Text>
          </PopoverHeader>
          <PopoverBody padding={'0px'}>{isOpen && <AlarmList />}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
