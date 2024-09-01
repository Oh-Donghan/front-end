import { Box, Flex, Image, Text } from '@chakra-ui/react';
import defaul_profile from '../../../assets/image/modal/chat/profile.png';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../../utils/dateFormat';

export default function Chat({ chat }) {
  return (
    <Link to={`/rooms?id=${chat.id}`}>
      <Flex
        _hover={{ bgColor: 'rgba(240,240,240,1)' }}
        align="center"
        justify="space-between"
        cursor={'pointer'}
        paddingX={'14px'}
        paddingY={'16px'}
      >
        <Flex align={'center'}>
          <Box w={'50px'} h={'50px'} borderRadius={'50%'} overflow={'hidden'}>
            <Image
              src={chat.auction.thumbnail ? chat.auction.thumbnail : defaul_profile}
              alt={chat.auction.title}
            />
          </Box>
          <div className="ml-3">
            <Text
              fontSize={17}
              textColor={'rgba(70,70,70,1)'}
              fontWeight={'bold'}
              marginBottom={'3px'}
            >
              {chat.auction.title}
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
          {/* <Flex
            className=" text-white font-thin w-4 h-4"
            alignItems={'center'}
            justifyContent={'center'}
            fontSize={11}
            borderRadius={'50%'}
            bgColor={'rgb(49, 130, 206)'}
          >
            쌓인 메세지 count
          </Flex> */}
        </Flex>
      </Flex>
    </Link>
  );
}
