import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export const sampleData = [
  {
    id: 1,
    productName: '메시 국대 유니폼',
    price: '95,000P',
    sellerId: 'abcd153',
    status: '거래 종료',
    purchaseDate: '2024-07-24',
    details: {
      deliveryMethod: '만나서 거래',
      condition: '4.5 / 5',
      sellerEmail: 'abcd153@gmail.com',
      color: '노란색',
      startingBid: '80,000P',
      instantBuyPrice: '100,000P',
    },
  },
  {
    id: 2,
    productName: '마이클 조던 농구화',
    price: '95,000P',
    sellerId: 'abcd153',
    status: '거래 진행 중',
    purchaseDate: '2024-07-22',
    details: {
      deliveryMethod: '택배',
      condition: '새 상품',
      sellerEmail: 'abcd153@gmail.com',
      color: '검정색',
      startingBid: '90,000P',
      instantBuyPrice: '120,000P',
    },
  },
  {
    id: 3,
    productName: '마이클 조던 농구화',
    price: '95,000P',
    sellerId: 'abcd153',
    status: '거래 진행 중',
    purchaseDate: '2024-07-22',
    details: {
      deliveryMethod: '택배',
      condition: '새 상품',
      sellerEmail: 'abcd153@gmail.com',
      color: '검정색',
      startingBid: '90,000P',
      instantBuyPrice: '120,000P',
    },
  },
  {
    id: 4,
    productName: '마이클 조던 농구화',
    price: '95,000P',
    sellerId: 'abcd153',
    status: '거래 진행 중',
    purchaseDate: '2024-07-22',
    details: {
      deliveryMethod: '택배',
      condition: '새 상품',
      sellerEmail: 'abcd153@gmail.com',
      color: '검정색',
      startingBid: '90,000P',
      instantBuyPrice: '120,000P',
    },
  },
  {
    id: 5,
    productName: '마이클 조던 농구화',
    price: '95,000P',
    sellerId: 'abcd153',
    status: '거래 진행 중',
    purchaseDate: '2024-07-22',
    details: {
      deliveryMethod: '택배',
      condition: '새 상품',
      sellerEmail: 'abcd153@gmail.com',
      color: '검정색',
      startingBid: '90,000P',
      instantBuyPrice: '120,000P',
    },
  },

  // 추가 데이터 ...
];

export default function OrderTable() {
  const location = useLocation();
  const isBuyPage = location.pathname === '/mypage/buy';

  return (
    <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
      <Thead>
        <Tr>
          <Th padding={'12px'} fontSize={'normal'}>
            상품명
          </Th>
          <Th padding={'12px'} fontSize={'normal'}>
            결제 금액
          </Th>
          <Th padding={'12px'} fontSize={'normal'}>
            {isBuyPage ? '판매자' : '구매자'} 아이디
          </Th>
          <Th padding={'12px'} fontSize={'normal'}>
            상태
          </Th>
          <Th padding={'12px'} fontSize={'normal'}>
            {isBuyPage ? '구매' : '판매'} 날짜
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {sampleData.map(item => (
          <Tr key={item.id}>
            <Td colSpan={5} p={0} className="relative">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton
                    as={Box}
                    width="100%"
                    display="flex"
                    alignItems="center"
                    padding="0px"
                  >
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.productName}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.price}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.sellerId}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.status}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.purchaseDate}
                    </Box>
                    <div className="absolute right-3">
                      <AccordionIcon />
                    </div>
                  </AccordionButton>
                  <AccordionPanel bgColor={'gray.100'} paddingX={'12px'} paddingY={'20px'}>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(4, 1fr)"
                      gap={4}
                      className="text-sm"
                    >
                      <Box className="flex flex-col gap-6">
                        <p className="flex flex-col gap-1">
                          <strong>수령 방법</strong> {item.details.deliveryMethod}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>상품명</strong> {item.productName}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>색상</strong> {item.details.color}
                        </p>
                      </Box>
                      <Box className="flex flex-col gap-6">
                        <p className="flex flex-col gap-1">
                          <strong>상태</strong> {item.details.condition}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>결제 금액</strong> {item.price}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>입찰 시작가</strong> {item.details.startingBid}
                        </p>
                      </Box>
                      <Box className="flex flex-col gap-6">
                        <p className="flex flex-col gap-1">
                          <strong>{isBuyPage ? '판매자' : '구매자'} 이메일</strong>{' '}
                          {item.details.sellerEmail}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>{isBuyPage ? '구매' : '판매'} 날짜</strong> {item.purchaseDate}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>즉시 구매가</strong> {item.details.instantBuyPrice}
                        </p>
                      </Box>
                      <Box className="bg-stone-400"></Box>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
