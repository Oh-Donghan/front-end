import { Box, Table, Tbody, Td, Tr, useBreakpointValue } from '@chakra-ui/react';
import { formatDate } from '../../../utils/dateFormat';

export default function RechargeTable({ posts }) {
  const fontSize = useBreakpointValue({ base: 'xxs', md: 'sm', lg: 'md' });
  const tdPadding = useBreakpointValue({ base: '8px', md: '12px', lg: '16px' }); // 반응형 패딩 설정

  if (!posts || posts.length === 0) {
    return <div>구매 목록이 없습니다.</div>;
  }

  return (
    <div className="overflow-y-scroll no-scrollbar h-full max-sm:h-72">
      <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
        <Tbody>
          {posts.map(item => (
            <Tr key={item.id}>
              <Td
                w={{ base: '40px', md: '80px' }}
                fontWeight={'bold'}
                textAlign={'center'}
                className={`${
                  item.pointType === 'USE' ? 'bg-white text-black' : 'bg-black text-white'
                }`}
                fontSize={fontSize} // 반응형 폰트 사이즈 적용
                padding={tdPadding} // 반응형 패딩 적용
              >
                {item.pointType === 'USE' ? '사용' : '충전'}
              </Td>
              <Td padding={tdPadding}>
                <Box display="flex" justifyContent="space-between" fontSize={fontSize}>
                  <Box>
                    <span>{formatDate(item.createdAt)}</span>
                  </Box>
                  <Box textAlign="right" className="flex gap-8">
                    <span className="block">{item.curPointAmount}P</span>
                    <span
                      className={`block w-24 ${
                        item.pointAmount > 0 ? 'text-blue-600' : 'text-red-600'
                      }`}
                    >
                      {item.pointAmount > 0 ? `+${item.pointAmount}` : item.pointAmount}P
                    </span>
                  </Box>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
