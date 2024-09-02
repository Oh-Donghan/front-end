import React, { RefObject, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
  Text,
  useMediaQuery,
  Portal,
} from '@chakra-ui/react';
import AlarmList from './AlarmList';

interface AlarmModalType {
  containerRef?: RefObject<HTMLDivElement>;
}

export default function AlarmModal({ containerRef }: AlarmModalType) {
  const initialRef = useRef();
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Box ref={initialRef} position={'relative'} zIndex={50}>
      <Popover
        placement={isLargerThan480 ? 'bottom-end' : 'bottom'}
        closeOnBlur={true}
        trigger={'hover'}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <PopoverTrigger>
          <Box _hover={{ bgColor: 'rgba(226,232,240,1)' }} cursor={'pointer'} mx={-6} px={6} py={3}>
            알림
          </Box>
        </PopoverTrigger>
        <Portal containerRef={containerRef}>
          <PopoverContent
            width={isLargerThan480 ? '640px' : '90vw'}
            position={'relative'}
            zIndex={1500} // 매우 높은 z-index 값 설정
          >
            <PopoverArrow />
            <PopoverHeader
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
              paddingY={4}
              paddingLeft={6}
              bgColor={'rgba(255,255,255,1)'}
            >
              <Text
                fontSize={isLargerThan480 ? '15px' : '12px'}
                color={'rgba(160,160,160,1)'}
                fontWeight={'normal'}
              >
                *최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.
              </Text>
            </PopoverHeader>
            <PopoverBody padding={'0px'}>{isOpen && <AlarmList />}</PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}
