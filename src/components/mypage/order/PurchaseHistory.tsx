import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPurchaseHistoryData, ITransType } from '../../../axios/mocks/order/purchaseHistory';
import MypageInput from './MypageInput';
import { IoMdRefresh } from 'react-icons/io';

export default function PurchaseHistory() {
  // 객체로 상태 관리
  const [params, setParams] = useState({
    currentPage: 1,
    searchWord: '',
    transType: ITransType.ALL,
    sorted: 'recent',
    startDate: null,
    endDate: null,
  });

  const itemsPerPage = 5;

  // Tanstack Query를 사용하여 데이터를 패칭
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      '/api/transactions/purchases',
      params.currentPage,
      params.searchWord,
      params.transType,
      params.sorted,
      params.startDate,
      params.endDate,
    ],
    queryFn: () =>
      fetchPurchaseHistoryData(
        params.currentPage,
        itemsPerPage,
        params.searchWord,
        params.transType,
        params.sorted,
        params.startDate,
        params.endDate,
      ),
    placeholderData: keepPreviousData,
  });

  // 핸들러 함수들
  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, currentPage: page }));
  };

  const handleTransTypeChange = (type: ITransType) => {
    setParams(prev => ({ ...prev, transType: type, currentPage: 1 }));
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
      searchWord: '',
      transType: ITransType.ALL,
      sorted: 'recent',
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
    <Box flex={1} flexDirection={'column'} className="p-4 flex">
      <Flex gap={4} height={'34px'}>
        {/* 정렬 기준 */}
        <Menu>
          <MenuButton
            w="120px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {params.sorted === 'recent'
              ? '최신순'
              : params.sorted === 'old'
                ? '오래된순'
                : params.sorted === 'low'
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
            {params.transType === ITransType.ALL
              ? '전체'
              : params.transType === ITransType.CONTINUE
                ? '진행중'
                : '종료'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransType.ALL)}>
              전체
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransType.CONTINUE)}>
              진행 중
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransType.SUCCESS)}>
              종료
            </MenuItem>
          </MenuList>
        </Menu>

        <Calendar isInfo={false} onDateChange={handleDateChange} />
        <MypageInput
          setSearchWord={(word: string) => setParams(prev => ({ ...prev, searchWord: word }))}
          onSearch={handlePageChange}
        />
        <Box className="cursor-pointer flex items-center" onClick={handleRefresh}>
          <IoMdRefresh fontSize={'22px'} />
        </Box>
      </Flex>
      <OrderTable posts={data?.content || []} />
      <HistoryPagination
        totalPages={data.totalPages}
        currentPage={params.currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
