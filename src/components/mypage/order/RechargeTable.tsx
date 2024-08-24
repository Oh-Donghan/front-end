import { Box, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { formatDate } from '../../../utils/dateFormat';

export default function RechargeTable({ posts }) {
  if (!posts || posts.length === 0) {
    return <div>구매 목록이 없습니다.</div>;
  }

  return (
    <div className="overflow-y-scroll no-scrollbar h-full">
      <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
        <Tbody>
          {posts.map(item => (
            <Tr key={item.id}>
              <Td
                className={`w-20 text-center font-bold ${item.pointType === 'USE' ? 'bg-white text-black' : item.pointType === 'CHARGE' && 'bg-black text-white'}`}
              >
                {item.pointType === 'USE' ? '사용' : item.pointType === 'CHARGE' && '충전'}
              </Td>
              <Td>
                <Box display="flex" justifyContent="space-between">
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
