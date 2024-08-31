import { Flex, Text } from '@chakra-ui/react';
import defaul_profile from '../../../assets/image/modal/chat/profile.png';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateFormat';

export default function Chat({ chat }) {
  const auction = chat.aution;

  return (
    <Link to={`/rooms?id=${auction.id}`}>
      <Flex
        _hover={{ bgColor: 'rgba(240,240,240,1)' }}
        align="center"
        justify="space-between"
        cursor={'pointer'}
        paddingX={'14px'}
        paddingY={'16px'}
      >
        <Flex align={'center'}>
          <img
            src={auction.thumbnail ? auction.thumbnail : defaul_profile}
            alt={auction.title}
            className="w-[50px] h-[50px]"
          />
          <div className="ml-2.5">
            <Text
              fontSize={16}
              textColor={'rgba(70,70,70,1)'}
              fontWeight={'bold'}
              marginBottom={'3px'}
            >
              {auction.title}
            </Text>
            <Text fontSize={12} textColor={'rgba(160,160,160,1)'}>
              {/* 마지막 채팅 */}
            </Text>
          </div>
        </Flex>
        <Flex direction="column" ml="auto" align="flex-end">
          <Text
            fontSize={13}
            fontWeight={'thin'}
            textColor={'rgba(160,160,160,1)'}
            marginBottom={'6px'}
          >
            {timeAgo(chat.createdAt)}
          </Text>
          <Flex
            className="bg-violet-400 text-white font-thin w-4 h-4"
            alignItems={'center'}
            justifyContent={'center'}
            fontSize={11}
            borderRadius={'50%'}
          >
            {/* 읽은 메세지면 1 or 읽지 않았으면 0 */}
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}
