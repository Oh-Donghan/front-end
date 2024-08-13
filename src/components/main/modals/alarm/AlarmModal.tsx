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
import AlarmList from './AlarmList';

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
        <PopoverContent width={'520px'}>
          <PopoverArrow />
          <PopoverHeader
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            paddingY={4}
            paddingLeft={6}
          >
            <Text fontSize={15} color={'rgba(160,160,160,1)'} fontWeight={'normal'}>
              *최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.
            </Text>
          </PopoverHeader>
          <PopoverBody padding={'0px'}>
            <AlarmList />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
