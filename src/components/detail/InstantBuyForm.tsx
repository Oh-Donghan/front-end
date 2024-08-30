import { useMutation } from '@tanstack/react-query';
import { fetchInstantBuyData } from '../../axios/auctionDetail/InstantBuy';
import { Button, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { authState } from '../../recoil/atom/authAtom';
import { useRecoilState } from 'recoil';

const InstantBuyForm = ({ auctionId }) => {
  const [auth] = useRecoilState(authState);
  const toast = useToast();

  // useMutation 훅을 사용하여 API 요청을 관리
  const { mutate } = useMutation({
    mutationFn: () => fetchInstantBuyData(auctionId),
    onSuccess: () => {
      toast({
        title: '구매 성공',
        description: '즉시 구매가 완료되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: AxiosError) => {
      // AxiosError 타입으로 에러 객체 캐스팅
      let errorMessage: string;
      if (typeof error.response?.data === 'string') {
        errorMessage = error.response.data;
      } else {
        errorMessage = '즉시 구매에 실패했습니다. 다시 시도해주세요.';
      }
      toast({
        title: '구매 실패',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <Button colorScheme="blue" w="full" mt={2} onClick={() => mutate()} isDisabled={!auth}>
      즉시 구매
    </Button>
  );
};

export default InstantBuyForm;
