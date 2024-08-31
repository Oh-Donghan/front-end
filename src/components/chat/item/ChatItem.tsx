import { Flex, Text } from '@chakra-ui/react';
import default_profile from '../../../assets/image/modal/chat/profile.png';
import { timeAgo } from '../../../utils/dateFormat';

export default function ChatItem({ chat, isSelected, onSelect }) {
  return (
    <Flex
      _hover={{ bgColor: 'rgba(245,245,245,1)' }}
      align="center"
      justify="space-between"
      minWidth={'390px'}
      cursor={'pointer'}
      paddingLeft={'16px'}
      paddingRight={'20px'}
      paddingY={'18px'}
      bgColor={!isSelected ? 'rgba(255,255,255,1)' : 'rgba(245,245,245,1)'}
      onClick={onSelect}
    >
      <Flex align={'center'}>
        <img src={default_profile} alt="기본 프로필 이미지" className="w-[50px] h-[50px]" />
        <div className="ml-2.5">
          <Text
            fontSize={15}
            textColor={'rgba(70,70,70,1)'}
            fontWeight={'bold'}
            marginBottom={'3px'}
          >
            {chat.auction.title}
          </Text>
          <Text fontSize={12} textColor={'rgba(160,160,160,1)'}>
            {/* 채팅 마지막 메세지 */}
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
          {/* 채팅 읽었는지 아닌지 표시*/}
        </Flex>
      </Flex>
    </Flex>
  );
}
