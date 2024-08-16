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

export default function OrderTable({ posts }) {
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
        {posts.map(item => (
          <Tr key={item.auctionId}>
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
                      {item.salePrice}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.buyerId}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.productStatus}
                    </Box>
                    <Box flex="1" textAlign="left" paddingX={'12px'} paddingY={'20px'}>
                      {item.saleDate}
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
                          <strong>수령 방법</strong> {item.receiveType}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>상품명</strong> {item.productName}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>색상</strong> {item.productColor}
                        </p>
                      </Box>
                      <Box className="flex flex-col gap-6">
                        <p className="flex flex-col gap-1">
                          <strong>상태</strong> {item.productStatus}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>결제 금액</strong> {item.salePrice}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>입찰 시작가</strong> {item.startPrice}
                        </p>
                      </Box>
                      <Box className="flex flex-col gap-6">
                        <p className="flex flex-col gap-1">
                          <strong>{isBuyPage ? '판매자' : '구매자'} 이메일</strong>{' '}
                          {item.sellerEmail}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>{isBuyPage ? '구매' : '판매'} 날짜</strong> {item.saleDate}
                        </p>
                        <p className="flex flex-col gap-1">
                          <strong>즉시 구매가</strong> {item.instantPrice}
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
