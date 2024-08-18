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
} from '@chakra-ui/react';
import { useRef } from 'react';
import AlarmList from './AlarmList';

export default function AlarmModal() {
  const initialRef = useRef(null);
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  return (
    <Box ref={initialRef} position={'relative'} zIndex={'50'}>
      <Popover
        placement={isLargerThan480 ? 'bottom-end' : 'bottom'}
        closeOnBlur={true}
        trigger={'hover'}
      >
        <PopoverTrigger>
          <span>알림</span>
        </PopoverTrigger>
        <PopoverContent width={isLargerThan480 ? '480px' : '90vw'}>
          <PopoverArrow />
          <PopoverHeader
            display={'flex'}
            justifyContent={'start'}
            alignItems={'center'}
            paddingY={4}
            paddingLeft={6}
          >
            <Text
              fontSize={isLargerThan480 ? '15px' : '12px'}
              color={'rgba(160,160,160,1)'}
              fontWeight={'normal'}
            >
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
