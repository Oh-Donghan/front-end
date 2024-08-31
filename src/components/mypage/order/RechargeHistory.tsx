import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import HistoryPagination from './HistoryPagination';
import Calendar from '../calendar/Calendar';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import RechargeTable from './RechargeTable';
import { IoMdRefresh } from 'react-icons/io';
import { fetchRechargeData } from '../../../axios/mypage/recharge';
import RechargePoint from './RechargePoint';

export default function RechargeHistory() {
  const [params, setParams] = useState({
    currentPage: 1,
    sorted: 'latest',
    startDate: null,
    endDate: null,
  });

  const itemsPerPage = 7;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recharge', params.currentPage, params.sorted, params.startDate, params.endDate],
    queryFn: () =>
      fetchRechargeData(
        params.currentPage,
        itemsPerPage,
        params.sorted,
        params.startDate,
        params.endDate,
      ),
    placeholderData: keepPreviousData,
  });

  console.log('dataa:', data);

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

  const handleRefresh = () => {
    setParams({
      currentPage: 1,
      sorted: 'latest',
      startDate: null,
      endDate: null,
    });
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
    <Box
      className="flex flex-col"
      w="100%"
      h="100vh"
      overflow="hidden"
      textColor={'rgba(70,70,70,1)'}
    >
      <Flex
        direction={{ base: 'row' }}
        wrap={'wrap'}
        gap={{ base: '2', md: '4' }}
        mb={4}
        alignItems={'center'}
        justifyContent={{ base: 'center', md: 'left' }}
      >
        <Menu>
          <MenuButton
            h="34px"
            fontSize="sm"
            w={{ base: '100%', lg: '122px' }}
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {params.sorted === 'latest' ? '최신순' : params.sorted === 'oldest' && '오래된순'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('latest')}>
              최신순
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('oldest')}>
              오래된순
            </MenuItem>
          </MenuList>
        </Menu>
        <Calendar onDateChange={handleDateChange} />
        <Box className="cursor-pointer flex items-center" onClick={handleRefresh}>
          <IoMdRefresh fontSize={'22px'} />
        </Box>
      </Flex>
      <Box>
        <RechargePoint />
      </Box>
      <RechargeTable posts={data?.content || []} />
      <HistoryPagination
        totalPages={data?.totalPages}
        currentPage={params?.currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
