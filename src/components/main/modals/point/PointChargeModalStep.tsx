import { Divider, Flex, Text } from '@chakra-ui/react';
import { BsCheck } from 'react-icons/bs';

export default function PointChargeModalStep({ step }) {
  return (
    <Flex alignItems="center">
      <Flex alignItems="center">
        <Text
          fontSize={14}
          bgColor={'rgb(49, 130, 206)'}
          textColor={'white'}
          width={6}
          height={6}
          borderRadius={'50%'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginRight={1.5}
          paddingRight={0.5}
        >
          {step === 1 ? '1' : <BsCheck size={20} />}
        </Text>
        <Text fontSize={16}>충전 포인트 선택</Text>
      </Flex>
      <Divider
        width={'30px'}
        borderColor="rgba(170,170,170,1)"
        borderWidth="0.5px"
        marginX={'12px'}
      />
      <Flex alignItems="center">
        <Text
          fontSize={15}
          border={'1.5px solid rgb(49, 130, 206)'}
          bgColor={step === 1 ? 'white' : 'rgb(49, 130, 206)'}
          textColor={step === 1 ? 'rgb(70,70,70)' : 'white'}
          width={6}
          height={6}
          borderRadius={'50%'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginRight={1.5}
        >
          2
        </Text>
        <Text fontSize={16} color={step === 1 ? 'rgba(150,150,150,1)' : 'rgba(70,70,70,1)'}>
          결제 수단 선택
        </Text>
      </Flex>
    </Flex>
  );
}
