import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import HistoryPagination from './HistoryPagination';
import Calendar from '../calendar/Calendar';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRechargeHistoryData } from '../../../axios/mocks/order/rechargeHistory';
import { formatDate } from '../../../utils/dateFormat';

export default function RechargeHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [sorted, setSorted] = useState('recent'); // 정렬 기준 상태 추가
  const [endDate, setEndDate] = useState(null);
  const itemsPerPage = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['api/members/points/history', currentPage, sorted, startDate, endDate],
    queryFn: () => fetchRechargeHistoryData(currentPage, itemsPerPage, sorted, startDate, endDate),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortOption: string) => {
    setSorted(sortOption);
    setCurrentPage(1); // 정렬이 변경될 때 페이지 초기화
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1); // 날짜 변경 시 페이지 초기화
  };

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box flex={1} flexDirection={'column'} className="p-4 flex">
      <Flex gap={4}>
        <Menu>
          <MenuButton
            w="100px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {sorted === 'recent' ? '최신순' : sorted === 'old' && '오래된순'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('recent')}>
              최신순
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('old')}>
              오래된순
            </MenuItem>
          </MenuList>
        </Menu>
        <Calendar isInfo={false} onDateChange={handleDateChange} />
      </Flex>
      <Box>
        <Flex
          justifyContent={'end'}
          alignItems={'end'}
          gap={4}
          marginRight={'24px'}
          marginBottom={'8px'}
        >
          <span>보유 포인트</span>
          <div className="text-4xl">200,000P</div>
        </Flex>
      </Box>
      <div className="overflow-y-scroll no-scrollbar h-full">
        <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
          <Tbody>
            {data.content.map(item => (
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
      <HistoryPagination
        totalPages={data.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
