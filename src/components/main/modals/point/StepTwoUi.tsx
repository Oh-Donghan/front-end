import {
  Button,
  Flex,
  InputGroup,
  InputLeftAddon,
  Text,
  Input,
  useToast,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PayOptionList from './PayOptionList';
import { createPayment } from '../../../../axios/point/point';

export default function StepTwoUi({
  setDirectInputMode,
  setChargePoint,
  chargePoint,
  setStep,
  handleClose,
  chargeOrderInfo,
}) {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  // async 키워드를 추가하여 비동기 함수를 정의
  const onSubmit = async data => {
    if (!data.agree) {
      toast({
        title: '필수 약관에 동의해주세요.',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    try {
      const res = await createPayment({
        orderId: chargeOrderInfo.orderId,
        memberId: chargeOrderInfo.memberId,
        price: chargePoint,
      });

      // 상태 초기화 및 닫기
      reset();
      handleClose();

      // 응답받은 redirect 주소로 이동
      window.location.href = res.next_redirect_pc_url;
    } catch (error) {
      // 오류 처리
      console.error(error);
      toast({
        title: '결제 중 오류가 발생했습니다.',
        status: 'error',
        duration: 1300,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftAddon fontSize={16} borderBottomRadius={'none'} width={'152px'}>
          충전 예정 포인트
        </InputLeftAddon>
        <Input
          placeholder={`${Number(chargePoint).toLocaleString()}P`}
          border={'1px solid rgba(220,220,220,1)'}
          borderBottom={'none'}
          fontSize={17}
          fontWeight={'semibold'}
          _placeholder={{ color: 'rgba(70,70,70,1)' }}
          readOnly={true}
          _focus={{ border: '1px solid rgba(220,220,220,1)' }}
          borderBottomRadius={'none'}
          {...register('point')}
        />
      </InputGroup>
      <InputGroup marginBottom={'30px'}>
        <InputLeftAddon fontSize={16} borderTopRadius={'none'} width={'152px'}>
          결제 금액
        </InputLeftAddon>
        <Input
          placeholder={`${Number(chargePoint).toLocaleString()}원 (VAT 포함)`}
          border={'1px solid rgba(220,220,220,1)'}
          fontSize={17}
          fontWeight={'semibold'}
          _placeholder={{ color: 'rgba(70,70,70,1)' }}
          readOnly={true}
          _focus={{ border: '1px solid rgba(220,220,220,1)' }}
          borderTopRadius={'none'}
        />
      </InputGroup>
      <PayOptionList />
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Checkbox fontSize="18px" marginTop={'14px'} {...register('agree')}>
          <Flex alignItems={'center'}>
            <Text fontSize="sm" color={'rgba(100,100,100,1)'}>
              구매조건을 확인했으며 동의합니다.
            </Text>
            <Text fontSize="xs" color={'rgb(241, 63, 63)'} marginLeft={'2px'}>
              *필수
            </Text>
          </Flex>
        </Checkbox>
        <Popover trigger="hover">
          <PopoverTrigger>
            <Text
              cursor={'pointer'}
              fontSize={'0.75rem'}
              color={'rgba(140,140,140,1)'}
              paddingTop={'14px'}
            >
              내용 보기
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold" fontSize={'0.95rem'}>
              구매조건
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody fontSize={'0.75rem'} lineHeight={'26px'} padding={'14px'}>
              <Text>
                제1조(목적) 본 약관은 대·중소기업·농어업협력재단 기술보호통합포털(이하 "당
                관리시스템")이 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당
                관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
              </Text>
              <Text marginTop={'12px'}>
                제2조(약관의 효력 및 변경) ① 당 관리시스템은 귀하가 본 약관 내용에 동의하는 것을
                조건으로 귀하에게 서비스를 제공할 것이며, 귀하가 본 약관의 내용에 동의 하는 경우, 당
                관리시스템의 서비스 제공 행위 및 서비스 사용 행위에는 본 약관이 우선적으로 적용될
                것입니다.
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex justify={'center'} mt={4}>
        <Button
          variant="ghost"
          border={'1px solid rgba(210,210,210,1)'}
          color={'rgba(120,120,120,1)'}
          onClick={() => {
            setChargePoint(5000);
            setDirectInputMode(false);
            setStep(1);
          }}
        >
          이전
        </Button>
        <Button colorScheme="blue" mr={3} marginLeft={'12px'} type="submit">
          결제
        </Button>
      </Flex>
    </form>
  );
}
