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
  Text,
} from '@chakra-ui/react';

export default function ConfirmPurchaseModal({ isOpen, onClose }) {
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
          <Checkbox fontSize="18px" marginTop={'24px'}>
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
            <Button colorScheme="blue" variant="solid" size="sm" paddingTop={'4px'}>
              확정
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
