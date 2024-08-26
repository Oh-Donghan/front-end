import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  useToast,
} from '@chakra-ui/react';
import ChatButton from '../../../common/button/ChatModalButton';
import ChatModalInput from './ChatModalInput';
import { useState } from 'react';
import ChatList from '../../chat/ChatList';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../recoil/atom/authAtom';

export default function ChatModal() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const isLoggedIn = useRecoilValue(authState);
  const toast = useToast();
  const log = true;

  const handleButtonClick = () => {
    // if (!isLoggedIn) {
    //   toast({
    //     title: `로그인 후 사용 가능한 서비스입니다.`,
    //     position: 'top',
    //     duration: 1300,
    //   });
    // } else {
    setIsChatModalOpen(prev => !prev);
    // }
  };

  return (
    <div className="fixed bottom-12 right-3 z-[100]">
      <Popover placement="top-start" closeOnBlur={false} isOpen={log && isChatModalOpen}>
        <span onClick={handleButtonClick}>
          <PopoverTrigger>
            <Button backgroundColor={'rgba(1,1,1,0)'} _hover={{ backgroundColor: 'rgba(1,1,1,0)' }}>
              <ChatButton isPopoverOpen={isChatModalOpen} />
            </Button>
          </PopoverTrigger>
        </span>
        {log && (
          <PopoverContent boxShadow={'2px 2px 6px rgba(1,1,1,0.1)'} width={'370px'}>
            <PopoverHeader marginRight={'20px'} width={'full'}>
              <ChatModalInput />
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody padding={'0px'}>
              <ChatList />
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
