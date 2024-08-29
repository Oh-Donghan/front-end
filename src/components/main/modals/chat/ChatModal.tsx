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
import { getChats } from '../../../../axios/chat/chat';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../recoil/atom/authAtom';

// const data = [
//   {
//     id: 10,
//     seller: [
//       {
//         id: 1,
//         member_id: 'user1',
//         email: 'user1@gmail.com',
//         social: 'google',
//         social_provider_id: '12678237749412345',
//       },
//     ],
//     buyer: [
//       {
//         id: 2,
//         member_id: 'user2',
//         email: 'user2@naver.com',
//         social: 'naver',
//         social_provider_id: 't734fd@5f8d@%56(&24',
//       },
//     ],
//     category: [
//       {
//         category_name: '청바지',
//       },
//     ],
//     auction: [
//       {
//         id: 4,
//         title: ' **** 휴먼메이드 청바지 제품 팝니다',
//         auction_status: '경매종료',
//         product_name: '휴먼메이드 청바지',
//         product_color: '연청',
//         product_status: '거의 새상품',
//         product_description: '2~3번 밖에 안입은 제품입니다.',
//         contact: true,
//         delivery: true,
//         delivery_type: '착불',
//         delivery_price: 3500,
//         start_price: 50000,
//         instance_price: 160000,
//         ended_at: '2024-08-04T11:12:17',
//         created_at: '2024-08-03T11:12:17',
//       },
//     ],
//   },
// ];

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
    queryFn: () => getChats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
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
