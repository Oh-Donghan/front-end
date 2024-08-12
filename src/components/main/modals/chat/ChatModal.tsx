import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
} from '@chakra-ui/react';
import ChatButton from './ChatModalButton';
import ChatModalInput from './ChatModalInput';
import { useState } from 'react';

export default function ChatModal() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-[100]">
      <Popover placement="top-start" closeOnBlur={false}>
        <span
          onClick={() => {
            setIsPopoverOpen(prev => {
              return (prev = !prev);
            });
          }}
        >
          <PopoverTrigger>
            <Button backgroundColor={'rgba(1,1,1,0)'} _hover={{ backgroundColor: 'rgba(1,1,1,0)' }}>
              <ChatButton isPopoverOpen={isPopoverOpen} />
            </Button>
          </PopoverTrigger>
        </span>
        <PopoverContent boxShadow={'2px 2px 6px rgba(1,1,1,0.1)'}>
          <PopoverHeader marginRight={'20px'} width={'full'}>
            <ChatModalInput />
          </PopoverHeader>
          <PopoverArrow />

          <PopoverBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
