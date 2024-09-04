import { Box, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Text } from '@chakra-ui/react';
import { formatDate } from '../../../utils/dateFormat';
import { formatPrice } from '../../../utils/formatPrice';

export default function RechargeTable({ posts }) {
  const fontSize = useBreakpointValue({ base: 'xs', md: 'sm', lg: 'md' });
  const tdPadding = useBreakpointValue({ base: '4px', md: '8px', lg: '12px' }); // 패딩을 더 줄여서 간격을 조정
  const thPadding = useBreakpointValue({ base: '8px', md: '12px', lg: '16px' }); // Thead의 패딩도 조정

  if (!posts || posts.length === 0) {
    return <div>거래 내역이 없습니다.</div>;
  }

  return (
    <Box overflowY="scroll" maxH="full" className="no-scrollbar h-full max-sm:h-72">
      <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Th padding={thPadding} w="100px">
              <Text fontSize={fontSize}>유형</Text>
            </Th>
            <Th padding={thPadding}>
              <Text fontSize={fontSize} textAlign="center">
                사용 시간
              </Text>
            </Th>
            <Th padding={thPadding}>
              <Text fontSize={fontSize} textAlign="center">
                잔여 포인트
              </Text>
            </Th>
            <Th padding={thPadding} isNumeric>
              <Text fontSize={fontSize}>변경 포인트</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map(item => (
            <Tr key={item.id}>
              <Td
                w="80px" // Td의 너비를 Th와 맞추기
                fontWeight="bold"
                textAlign="center"
                bgColor={
                  item.pointType === 'USE'
                    ? 'red.500'
                    : item.pointType === 'CHARGE'
                      ? 'green.500'
                      : 'blue.500'
                }
                color="white"
                fontSize={fontSize}
                padding={tdPadding}
              >
                {item.pointType === 'USE'
                  ? '사용'
                  : item.pointType === 'CHARGE'
                    ? '충전'
                    : '판매 수익'}
              </Td>
              <Td padding={tdPadding} fontSize={fontSize} textAlign="center">
                {formatDate(item.createdAt)}
              </Td>
              <Td padding={tdPadding} fontSize={fontSize} textAlign="center">
                {formatPrice(item.curPointAmount)}P
              </Td>
              <Td isNumeric padding={tdPadding} fontSize={fontSize}>
                <Text color={item.pointType === 'USE' ? 'red.600' : 'blue.600'} fontWeight="bold">
                  {item.pointType === 'USE'
                    ? `-${formatPrice(item.pointAmount)}`
                    : `+${formatPrice(item.pointAmount)}`}
                  P
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
