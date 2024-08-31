import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import { formatDate } from '../../../utils/dateFormat';

export default function OrderTable({ posts }) {
  const location = useLocation();
  const isBuyPage = location.pathname === '/mypage/buy';

  console.log('dataaa:', posts);

  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm', lg: 'md' });

  const receiveTypeMapping = {
    CONTACT: '대면 거래',
    DELIVERY: '택배',
    ALL: '모두 가능',
  };

  if (!posts || posts.length === 0) {
    return <div>{isBuyPage ? '구매' : '판매'} 목록이 없습니다.</div>;
  }

  return (
    <div className="overflow-y-scroll no-scrollbar h-full mt-6 max-sm:h-72">
      <Table
        variant="simple"
        width="full"
        sx={{ tableLayout: 'fixed' }}
        className="overflow-y-scroll no-scrollbar"
      >
        <Thead>
          <Tr>
            <Th padding={{ base: '4px', md: '12px' }} fontSize={fontSize}>
              상품명
            </Th>
            <Th padding={{ base: '4px', md: '12px' }} fontSize={fontSize}>
              결제 금액
            </Th>
            <Th padding={{ base: '4px', md: '12px' }} fontSize={fontSize}>
              {isBuyPage ? '판매자' : '구매자'} 아이디
            </Th>
            <Th padding={{ base: '4px', md: '12px' }} fontSize={fontSize}>
              상태
            </Th>
            <Th padding={{ base: '4px', md: '12px' }} fontSize={fontSize}>
              {isBuyPage ? '구매' : '판매'} 날짜
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map(item => (
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
                      <Box
                        flex="1"
                        textAlign="left"
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                        fontSize={fontSize}
                      >
                        {item.productName}
                      </Box>
                      <Box
                        flex="1"
                        textAlign="left"
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                        fontSize={fontSize}
                      >
                        {formatPrice(item.salePrice)}원
                      </Box>
                      <Box
                        flex="1"
                        textAlign="left"
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                        fontSize={fontSize}
                      >
                        {item.buyerId}
                      </Box>
                      <Box
                        flex="1"
                        textAlign="left"
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                        fontSize={fontSize}
                      >
                        {item.transType === 'SUCCESS'
                          ? '거래 종료'
                          : item.transType === 'CONTINUE'
                            ? '거래 진행중'
                            : item.transType === 'NONE' && '구매자 없이 거래 종료'}
                      </Box>
                      <Box
                        flex="1"
                        textAlign="left"
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                        fontSize={fontSize}
                      >
                        {item.saleDate.slice(0, 10)}
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
                        fontSize={fontSize}
                        className="text-sm"
                      >
                        <Box className="flex flex-col gap-6">
                          <p className="flex flex-col gap-1">
                            <strong>수령 방법</strong> {receiveTypeMapping[item.receiveType]}
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
                            <strong>상태</strong> {item.productStatus}/5
                          </p>
                          <p className="flex flex-col gap-1">
                            <strong>결제 금액</strong> {formatPrice(item.salePrice)}원
                          </p>
                          <p className="flex flex-col gap-1">
                            <strong>입찰 시작가</strong> {formatPrice(item.startPrice)}원
                          </p>
                        </Box>
                        <Box className="flex flex-col gap-6">
                          <p className="flex flex-col gap-1">
                            <strong>{isBuyPage ? '판매자' : '구매자'} 이메일</strong>{' '}
                            {item.sellerEmail}
                          </p>
                          <p className="flex flex-col gap-1">
                            <strong>{isBuyPage ? '구매' : '판매'} 날짜</strong>{' '}
                            {formatDate(item.saleDate)}
                          </p>
                          <p className="flex flex-col gap-1">
                            <strong>즉시 구매가</strong> {formatPrice(item.instantPrice)}원
                          </p>
                        </Box>
                        <Box className="bg-stone-400" width="100%" height="100%">
                          <Image
                            objectFit="cover"
                            src={item.thumbnailUrl}
                            width="100%"
                            height="100%"
                          />
                        </Box>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
