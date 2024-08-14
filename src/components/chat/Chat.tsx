import { Flex, Text } from '@chakra-ui/react';
import defaul_profile from '../../assets/image/main';

export default function Chat() {
  return (
    <Flex
      _hover={{ bgColor: 'rgba(240,240,240,1)' }}
      align="center"
      justify="space-between"
      cursor={'pointer'}
      paddingX={'14px'}
      paddingY={'16px'}
    >
      <Flex align={'center'}>
        <img src={defaul_profile} alt="기본 프로필 이미지" className="w-[50px] h-[50px]" />
        <div className="ml-2.5">
          <Text
            fontSize={16}
            textColor={'rgba(70,70,70,1)'}
            fontWeight={'bold'}
            marginBottom={'3px'}
          >
            메시 국대 유니폼
          </Text>
          <Text fontSize={12} textColor={'rgba(160,160,160,1)'}>
            안녕하세요!
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
          19:49
        </Text>
        <Flex
          className="bg-violet-400 text-white font-thin w-4 h-4"
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={11}
          borderRadius={'50%'}
        >
          1
        </Flex>
      </Flex>
    </Flex>
  );
}
