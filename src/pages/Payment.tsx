import { Button, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { approvePayment, getChargdePoint } from '../axios/point/point';
import { formatPrice } from '../utils/formatPrice';
import { formatDateToKorean } from '../utils/dateFormat';

export default function Payment() {
  const location = useLocation();
  const type = location.pathname.split('/')[3];

  const searchParams = new URLSearchParams(location.search);
  const partner_order_id = searchParams.get('partner_order_id');
  const pg_token = searchParams.get('pg_token');

  const { data: currentPoint, isLoading: currentPointLoading } = useQuery({
    queryKey: ['point'],
    queryFn: () => getChargdePoint(),
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
  });

  const { data: payment, isLoading: paymentLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: () => approvePayment({ partner_order_id, pg_token }),
    staleTime: 0,
    gcTime: 30 * 60 * 1000,
    enabled: type === 'approve',
  });

  if (currentPointLoading || paymentLoading) {
    return null;
  }

  return (
    <Flex w={'full'} h={'100vh'} bgColor={'white'} align={'center'} justify={'center'}>
      <Flex direction={'column'} w={'400px'} align={'center'} gap={2} marginBottom={18}>
        <Text fontSize={'2rem'} fontWeight={'bold'}>
          Logo
        </Text>
        <Text fontSize={'1.1rem'} marginTop={3} marginBottom={2}>
          {type === 'cancel'
            ? '카카오페이 결제가 취소되었습니다.'
            : '카카오페이 결제가 완료되었습니다.'}
        </Text>
        <Flex
          direction={'column'}
          minW={'380px'}
          w={'full'}
          bgColor={'rgba(240,240,240,0.8)'}
          padding={'30px'}
          gap={5}
          marginTop={'30px'}
          marginBottom={'30px'}
          borderRadius={'lg'}
        >
          {/* 결제 완료 UI */}
          {type === 'approve' && (
            <>
              <Flex justify={'space-between'}>
                <Text>결제일시</Text>
                <Text fontWeight={'semibold'}>{formatDateToKorean(payment.created_at)}</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Text>충전 포인트</Text>
                <Text fontWeight={'semibold'}>{formatPrice(Number(payment.amount.total))}원</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Text>보유 포인트</Text>
                <Text fontWeight={'semibold'}>
                  {formatPrice(Number(currentPoint.pointAmount) + Number(payment.amount.total))}원
                </Text>
              </Flex>
              <Flex w={'full'} justify={'center'} marginTop={'14px'}>
                <Text color={'rgba(140,140,140,1)'} fontWeight={'semibold'}>
                  이용해 주셔서 감사합니다.
                </Text>
              </Flex>
            </>
          )}
          {/* 결제 취소 UI */}
          {type === 'cancel' && (
            <>
              <Flex justify={'space-between'}>
                <Text>거래처</Text>
                <Text fontWeight={'semibold'}>땅땅땅 중고거래</Text>
              </Flex>
              <Flex justify={'space-between'}>
                <Text>보유 포인트</Text>
                <Text fontWeight={'semibold'}>
                  {formatPrice(Number(currentPoint.pointAmount))}원
                </Text>
              </Flex>
              <Flex w={'full'} justify={'center'} marginTop={'14px'}>
                <Text color={'rgba(140,140,140,1)'} fontWeight={'semibold'}>
                  이용해 주셔서 감사합니다.
                </Text>
              </Flex>
            </>
          )}
        </Flex>
        <Link to={'/'}>
          <Button
            color={'white'}
            bgColor={'rgba(49, 130, 206,1)'}
            _hover={{ bgColor: 'rgba(49, 120, 170,1)' }}
          >
            홈으로 이동
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
