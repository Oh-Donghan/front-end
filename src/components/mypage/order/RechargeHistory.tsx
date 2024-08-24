import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import HistoryPagination from './HistoryPagination';
import Calendar from '../calendar/Calendar';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRechargeHistoryData } from '../../../axios/mocks/order/rechargeHistory';
import RechargeTable from './RechargeTable';

export default function RechargeHistory() {
  const [params, setParams] = useState({
    currentPage: 1,
    sorted: 'recent',
    startDate: null,
    endDate: null,
  });

  const itemsPerPage = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'api/members/points/history',
      params.currentPage,
      params.sorted,
      params.startDate,
      params.endDate,
    ],
    queryFn: () =>
      fetchRechargeHistoryData(
        params.currentPage,
        itemsPerPage,
        params.sorted,
        params.startDate,
        params.endDate,
      ),
  });

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, currentPage: page }));
  };

  const handleSortChange = (sortOption: string) => {
    setParams(prev => ({ ...prev, sorted: sortOption, currentPage: 1 }));
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setParams(prev => ({
      ...prev,
      startDate: start,
      endDate: end,
      currentPage: 1,
    }));
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
            {params.sorted === 'recent' ? '최신순' : params.sorted === 'old' && '오래된순'}
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
      <RechargeTable posts={data?.content || []} />
      <HistoryPagination
        totalPages={data.totalPages}
        currentPage={params.currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
