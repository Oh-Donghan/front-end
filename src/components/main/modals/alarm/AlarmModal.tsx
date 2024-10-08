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
  Badge,
} from '@chakra-ui/react';
import AlarmList from './AlarmList';

interface AlarmModalType {
  containerRef?: RefObject<HTMLDivElement>;
  type?: string;
  onOpen?: () => void; // 추가
  isNewNotification?: boolean;
}

export default function AlarmModal({ type, onOpen, isNewNotification }: AlarmModalType) {
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
            position={'relative'}
            _hover={{
              bgColor: type === 'drawer' ? 'rgba(226,232,240,1)' : 'rgba(255,255,255,1)',
            }}
            cursor={'pointer'}
            mx={-6}
            px={6}
            py={3}
          >
            알림
            {isNewNotification && (
              <Badge
                bgColor={'rgba(228, 25, 18)'}
                position="absolute"
                top="13px"
                right="256px"
                borderRadius="full"
                width="8px"
                height="8px"
                display="inline-block"
              />
            )}
          </Box>
        </PopoverTrigger>

        <PopoverContent minWidth={'610px'}>
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
