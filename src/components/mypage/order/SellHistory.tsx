import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchSellHistoryData } from '../../../axios/mocks/order/sellHistory';
import MypageInput from './MypageInput';

export default function SellHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [transType, setTransType] = useState(''); // 추가된 상태
  const [sorted, setSorted] = useState('recent'); // 정렬 기준 상태 추가
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const itemsPerPage = 5;

  // Tanstack Query를 사용하여 데이터를 패칭
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      '/api/transactions/sales',
      currentPage,
      searchWord,
      transType,
      sorted,
      startDate,
      endDate,
    ],
    queryFn: () =>
      fetchSellHistoryData(
        currentPage,
        itemsPerPage,
        searchWord,
        transType,
        sorted,
        startDate,
        endDate,
      ),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTransTypeChange = (type: string) => {
    setTransType(type);
    setCurrentPage(1);
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
        {/* 정렬 기준 */}
        <Menu>
          <MenuButton
            w="120px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {sorted === 'recent'
              ? '최신순'
              : sorted === 'old'
                ? '오래된순'
                : sorted === 'low'
                  ? '가격 낮은 순'
                  : '가격 높은 순'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('recent')}>
              최신순
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('old')}>
              오래된순
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('low')}>
              가격 낮은 순
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSortChange('high')}>
              가격 높은 순
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 분류 필터링 */}
        <Menu>
          <MenuButton
            w="90px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {transType === ''
              ? '전체'
              : transType === 'continue'
                ? '진행중'
                : transType === 'end' && '종료'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('')}>
              전체
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('continue')}>
              진행 중
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('end')}>
              종료
            </MenuItem>
          </MenuList>
        </Menu>

        <Calendar isInfo={false} onDateChange={handleDateChange} />
        <MypageInput setSearchWord={setSearchWord} onSearch={handlePageChange} />
      </Flex>
      <OrderTable posts={data?.content || []} />
      <HistoryPagination
        totalPages={data.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
