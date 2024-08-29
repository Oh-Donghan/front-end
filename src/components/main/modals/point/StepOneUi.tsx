import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputLeftAddon,
  Text,
  Input,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import PointOptionList from './PointOptionList';
import { crateChargeOrder, getChargdePoint } from '../../../../axios/point/point';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '../../../../utils/formatPrice';

export default function StepOneUi({
  setDirectInputMode,
  setChargePoint,
  inputError,
  directInputMode,
  setInputValue,
  handleInputChange,
  handleClose,
  chargePoint,
  setStep,
  inputValue,
  setChargeOrderInfo,
}) {
  const toast = useToast();

  const onNextClick = async () => {
    if (directInputMode && !inputValue.trim()) {
      toast({
        title: '입력란을 채워주세요.',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    if (chargePoint && !inputError) {
      await setStep(2);
      const res = await crateChargeOrder(chargePoint);
      await setChargeOrderInfo({ memberId: res.memberId, orderId: res.orderId });
      return;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['point'],
    queryFn: () => getChargdePoint(),
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <>
        <Flex align={'center'} justify={'center'} w={'530px'} height={'307px'}>
          <Spinner size={'lg'} />
        </Flex>
      </>
    );
  }

  return (
    <>
      <InputGroup marginBottom={'30px'}>
        <InputLeftAddon fontSize={16}>보유한 포인트</InputLeftAddon>
        <Input
          placeholder={`${formatPrice(data.pointAmount)}P`}
          border={'1px solid rgba(220,220,220,1)'}
          textAlign="right"
          fontSize={19}
          fontWeight={'semibold'}
          _placeholder={{ color: 'rgba(70,70,70,1)' }}
          readOnly={true}
          _focus={{ border: '1px solid rgba(220,220,220,1)' }}
        />
      </InputGroup>
      <Box>
        <PointOptionList
          setDirectInputMode={setDirectInputMode}
          setChargePoint={setChargePoint}
          inputError={inputError}
        />
        {directInputMode && (
          <Input
            type="number"
            placeholder={'충전할 금액을 입력해 주세요'}
            textAlign="right"
            fontSize={16}
            color="rgba(50,50,50,1)"
            border="1px solid rgba(210,210,210,1)"
            focusBorderColor={inputError ? 'rgba(236, 38, 4,1)' : 'rgb(49, 130, 206)'}
            marginBottom={'10px'}
            onChange={e => {
              setInputValue(e.target.value);
              handleInputChange(e);
            }}
          />
        )}

        <Text textAlign={'end'} color={inputError ? 'red' : 'rgba(150,150,150,1)'} fontSize={15}>
          {inputError ? '숫자만 입력 가능합니다.' : '*현금 1원은 1P입니다.'}
        </Text>
      </Box>
      <Flex justify={'center'} mt={4}>
        <Button
          variant="ghost"
          border={'1px solid rgba(210,210,210,1)'}
          color={'rgba(120,120,120,1)'}
          onClick={handleClose}
        >
          취소
        </Button>
        <Button colorScheme="blue" mr={3} onClick={onNextClick} marginLeft={'12px'}>
          다음
        </Button>
      </Flex>
    </>
  );
}
