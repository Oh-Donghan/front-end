import { Box, Flex, Image, Text } from '@chakra-ui/react';
import default_profile from '../../../assets/image/modal/chat/profile.png';
import { timeAgo } from '../../../utils/dateFormat';
import { ChatDataType } from '../../../interface/chat/chatInterface';
import { Link } from 'react-router-dom';

interface ChatItemPropsType {
  chat: ChatDataType;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ChatItem({ chat, isSelected, onSelect }: ChatItemPropsType) {
  return (
    <>
      <Link to={`/rooms?id=${chat.id}`}>
        <Flex
          _hover={{ bgColor: 'rgba(245,245,245,1)' }}
          align="center"
          justify="space-between"
          minWidth={'390px'}
          cursor={'pointer'}
          paddingLeft={'16px'}
          paddingRight={'20px'}
          paddingY={'15.5px'}
          bgColor={!isSelected ? 'rgba(255,255,255,1)' : 'rgba(245,245,245,1)'}
          onClick={onSelect}
          boxShadow={'0px 1px 2px rgba(120,120,120,0.1)'}
        >
          <Flex align={'center'}>
            <Box w={'50px'} h={'50px'} borderRadius={'50%'} overflow={'hidden'}>
              <Image
                src={chat.auction.thumbnail ? chat.auction.thumbnail : default_profile}
                alt={chat.auction.title}
              />
            </Box>
            <Flex ml={3} align={'center'}>
              <Text
                fontSize={17}
                textColor={'rgba(70,70,70,1)'}
                fontWeight={'bold'}
                marginBottom={'3px'}
              >
                {chat.auction.title}
              </Text>
              <Text fontSize={12} textColor={'rgba(160,160,160,1)'}>
                {/* 채팅 마지막 메세지 */}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" ml="auto" align="flex-end">
            <Text
              fontSize={13}
              fontWeight={'thin'}
              textColor={'rgba(160,160,160,1)'}
              marginBottom={'6px'}
            >
              {timeAgo(chat.lastMessageTime ? chat.lastMessageTime : chat.createdAt)}
            </Text>
            <>
              {chat.unReadCnt ? (
                <Flex
                  className=" text-white font-thin w-3 h-3"
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontSize={10}
                  borderRadius={'50%'}
                  bgColor={'rgb(49, 130, 206)'}
                >
                  {chat.unReadCnt}
                </Flex>
              ) : null}
            </>
          </Flex>
        </Flex>
      </Link>
    </>
  );
}
