import { Box, Flex, Text } from '@chakra-ui/react';
// import { useState } from 'react';

export default function PayOptionList() {
  // const [selectedOption, setSelectedOption] = useState(0);

  const payOptions = ['카카오페이', '신용카드', '실시간 이체', '가상계좌'];

  // 카카오페이만 가능하게 구현
  return (
    <Box>
      <Flex>
        <Text fontSize={17} fontWeight={'bold'} marginBottom={'10px'} color={'rgba(50, 50, 50, 1)'}>
          *결제 수단 선택
        </Text>
        <Text fontSize="xs" color={'rgb(241, 63, 63)'} marginLeft={'2px'} pt={'2px'} pl={'6px'}>
          *현재 카카오페이 결제만 가능합니다.
        </Text>
      </Flex>
      <Flex gap={3}>
        {payOptions.map((option, i) => {
          if (option === '카카오페이') {
            return (
              <Flex
                key={i}
                flex={'1'}
                justifyContent={'center'}
                alignItems={'center'}
                border={'1px solid rgba(230,230,230,1)'}
                height={'80px'}
                cursor={'pointer'}
                borderRadius={'md'}
                backgroundColor={'rgb(49, 130, 206)'}
                color={'white'}
                // onClick={() => {
                //   setSelectedOption(i);
                // }}
              >
                <Text>{option}</Text>
              </Flex>
            );
          } else {
            return (
              <Flex
                key={i}
                flex={'1'}
                justifyContent={'center'}
                alignItems={'center'}
                border={'1px solid rgba(230,230,230,1)'}
                height={'80px'}
                borderRadius={'md'}
                backgroundColor={'white'}
                color={'rgb(170,170,170,1)'}
                // onClick={() => {
                //   setSelectedOption(i);
                // }}
              >
                <Text>{option}</Text>
              </Flex>
            );
          }
        })}
      </Flex>
    </Box>
  );
}
