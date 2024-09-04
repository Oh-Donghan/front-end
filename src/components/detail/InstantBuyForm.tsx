import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchInstantBuyData } from '../../axios/auctionDetail/InstantBuy';
import { Button, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { authState } from '../../recoil/atom/authAtom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const InstantBuyForm = ({ auctionState, auctionId }) => {
  const [auth] = useRecoilState(authState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  // useMutation 훅을 사용하여 API 요청을 관리
  const { mutate } = useMutation({
    mutationFn: () => fetchInstantBuyData(auctionId),
    onSuccess: () => {
      toast({
        title: '구매 성공',
        description: '즉시 구매가 완료되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        onCloseComplete: () => {
          // 즉시 구매시 쿼리를 무효화하여 데이터를 새로고침
          queryClient.invalidateQueries({ queryKey: ['detail', auctionId] });
          // 홈으로 이동하고 새로고침
          navigate('/', { replace: true });
          window.location.reload();
        },
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
    <Button
      colorScheme="blue"
      w="full"
      mt={2}
      onClick={() => mutate()}
      isDisabled={!auth || auctionState === 'END'}
    >
      즉시 구매
    </Button>
  );
};

export default InstantBuyForm;
