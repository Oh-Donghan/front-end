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
import { useEffect, useState } from 'react';
import ChatList from '../../chat/ChatList';
import { useQuery } from '@tanstack/react-query';
import { getAllChats } from '../../../../axios/chat/chat';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../recoil/atom/authAtom';

export default function ChatModal() {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const auth = useRecoilValue(authState);
  const toast = useToast();

  useEffect(() => {
    if (isChatModalOpen) {
      setShouldFetch(true);
    }
  }, [isChatModalOpen]);

  const { data, isLoading } = useQuery({
    queryKey: ['chat'],
    queryFn: () => getAllChats(),
    staleTime: 0,
    gcTime: 0,
    enabled: shouldFetch,
  });

  const handleButtonClick = () => {
    if (!auth) {
      toast({
        title: `로그인 후 사용 가능한 서비스입니다.`,
        position: 'top',
        duration: 1300,
      });
    } else {
      setIsChatModalOpen(prev => !prev);
    }
  };

  return (
    <div className="fixed bottom-12 right-3 z-[100]">
      <Popover placement="top-start" closeOnBlur={false} isOpen={auth && isChatModalOpen}>
        <span onClick={handleButtonClick}>
          <PopoverTrigger>
            <Button backgroundColor={'rgba(1,1,1,0)'} _hover={{ backgroundColor: 'rgba(1,1,1,0)' }}>
              <ChatButton isPopoverOpen={isChatModalOpen} />
            </Button>
          </PopoverTrigger>
        </span>
        {auth && (
          <PopoverContent boxShadow={'2px 2px 6px rgba(1,1,1,0.1)'} width={'370px'}>
            <PopoverHeader marginRight={'20px'} width={'full'}>
              <ChatModalInput />
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody padding={'0px'}>
              <ChatList datas={data} isLoading={isLoading} />
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
