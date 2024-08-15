import { Flex, Text } from '@chakra-ui/react';
import default_profile from '../../assets/image/chat/profile.png';

export default function ChatItem({ chat, isSelected, onSelect }) {
  return (
    <Flex
      _hover={{ bgColor: 'rgba(245,245,245,1)' }}
      align="center"
      justify="space-between"
      minWidth={'350px'}
      cursor={'pointer'}
      paddingX={'16px'}
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
            {chat.name}
          </Text>
          <Text fontSize={12} textColor={'rgba(160,160,160,1)'}>
            {chat.message}
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
          {chat.time}
        </Text>
        <Flex
          className="bg-violet-400 text-white font-thin w-4 h-4"
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={11}
          borderRadius={'50%'}
        >
          {chat.unread}
        </Flex>
      </Flex>
    </Flex>
  );
}
