import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { confirmAuctionPayment } from '../../../axios/auction/auction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTransactions } from '../../../axios/auction/auctionItems';
import { useNavigate } from 'react-router-dom';

interface ConfirmAuctionPaymentInput {
  auctionId: string;
  price: number;
  sellerId: string;
}

export default function ConfirmPurchaseModal({ isOpen, onClose, currentAuction }) {
  const [isChecked, setIsCheked] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ auctionId, price, sellerId }: ConfirmAuctionPaymentInput) =>
      confirmAuctionPayment({ auctionId, price, sellerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat'] });
      toast({
        title: '구매 확정 완료되었습니다',
        status: 'success',
        duration: 1300,
      });
    },
    onError: error => {
      toast({
        title: '구매 확정을 실패하였습니다',
        status: 'error',
        duration: 1300,
      });
      console.error(`Confirm Auction Payment Error:${error}`);
    },
  });

  const onclick = async () => {
    if (!isChecked) {
      toast({
        title: '주의사항 확인란을 체크해 주세요',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    try {
      const res = await getTransactions(parseInt(currentAuction.auction.id));
      mutate({
        auctionId: String(currentAuction.auction.id),
        price: res.price,
        sellerId: res.sellerId,
      });
      onClose();
      navigate('/rooms?id=0');
    } catch (error) {
      console.log(`Get Transactions Error : ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered preserveScrollBarGap={true}>
      <ModalOverlay />
      <ModalContent maxWidth={'500px'} paddingTop={'14px'} paddingBottom={'16px'} paddingX={'12px'}>
        <ModalHeader paddingBottom={'14px'}>구매를 확정하시겠습니까?</ModalHeader>
        <ModalBody>
          <Flex direction={'column'} gap={3} fontSize={13} color={'rgba(50,50,50,1)'}>
            <Text>• 구매를 확정하면 환불이 불가합니다.</Text>
            <Text>• 구매를 확정하면 판매자와의 채팅은 자동으로 종료됩니다.</Text>
            <Text>• 구매확정 후 거래에 대한 정보는 개인정보처리방침에 따라 관리됩니다.</Text>
          </Flex>
          <Checkbox
            fontSize="18px"
            marginTop={'24px'}
            checked={isChecked}
            onChange={() => {
              setIsCheked(prev => !prev);
            }}
          >
            <Text fontSize={12} fontWeight={'thin'} color={'rgba(120,120,120,1)'}>
              주의사항을 모두 확인하였습니다.
            </Text>
          </Checkbox>
        </ModalBody>
        <ModalFooter paddingTop={'10px'}>
          <Flex gap={2}>
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              paddingTop={'4px'}
              onClick={() => {
                onClose();
              }}
            >
              취소
            </Button>
            <Button
              disabled={isPending}
              colorScheme="blue"
              variant="solid"
              size="sm"
              paddingTop={'4px'}
              onClick={onclick}
            >
              {isPending ? <Spinner size={'md'} /> : '확정'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
