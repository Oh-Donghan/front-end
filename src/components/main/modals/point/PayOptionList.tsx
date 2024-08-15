import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function PayOptionList() {
  const [selectedOption, setSelectedOption] = useState(0);

  const payOptions = ['카카오페이', '신용카드', '실시간 이체', '가상계좌'];

  return (
    <Box>
      <Text fontSize={17} fontWeight={'bold'} marginBottom={'10px'} color={'rgba(50, 50, 50, 1)'}>
        *결제 수단 선택
      </Text>
      <Flex gap={3}>
        {payOptions.map((option, i) => {
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
              _hover={{ bgColor: selectedOption !== i && 'rgba(240,240,240,1)' }}
              backgroundColor={selectedOption === i ? 'rgb(49, 130, 206)' : 'white'}
              color={selectedOption === i ? 'white' : 'rgb(170,170,170,1)'}
              onClick={() => {
                setSelectedOption(i);
              }}
            >
              <Text>{option}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
