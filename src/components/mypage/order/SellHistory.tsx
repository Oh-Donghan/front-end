import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchSellHistoryData, ITransTypeSell } from '../../../axios/mocks/order/sellHistory';
import MypageInput from './MypageInput';
import { IoMdRefresh } from 'react-icons/io';

export default function SellHistory() {
  // 객체로 상태 관리
  const [params, setParams] = useState({
    currentPage: 1,
    searchWord: '',
    transType: ITransTypeSell.ALL,
    sorted: 'recent',
    startDate: null,
    endDate: null,
  });
  const itemsPerPage = 5;

  // Tanstack Query를 사용하여 데이터를 패칭
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      '/api/transactions/sales',
      params.currentPage,
      params.searchWord,
      params.transType,
      params.sorted,
      params.startDate,
      params.endDate,
    ],
    queryFn: () =>
      fetchSellHistoryData(
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

  const handleTransTypeChange = (type: ITransTypeSell) => {
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
      transType: ITransTypeSell.ALL,
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
    <Box
      className="flex flex-col"
      w="100%"
      h="100vh"
      overflow="hidden"
      textColor={'rgba(70,70,70,1)'}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        wrap={'wrap'}
        gap={4}
        mb={4}
        alignItems={'center'}
      >
        {/* 정렬 기준 */}
        <Menu>
          <MenuButton
            h="34px"
            fontSize="sm"
            w={{ base: '100%', lg: '122px' }}
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
            h="34px"
            w={{ base: '100%', lg: '90px' }}
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            {params.transType === ITransTypeSell.ALL
              ? '전체'
              : params.transType === ITransTypeSell.CONTINUE
                ? '진행중'
                : '종료'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransTypeSell.ALL)}>
              전체
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransTypeSell.CONTINUE)}>
              진행 중
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange(ITransTypeSell.SUCCESS)}>
              종료
            </MenuItem>
          </MenuList>
        </Menu>

        <Calendar onDateChange={handleDateChange} />
        <Flex gap={{ base: '1', lg: '4' }} flex={1}>
          <MypageInput
            setSearchWord={(word: string) => setParams(prev => ({ ...prev, searchWord: word }))}
            onSearch={handlePageChange}
          />
          <Box className="cursor-pointer flex items-center" onClick={handleRefresh}>
            <IoMdRefresh fontSize={'22px'} />
          </Box>
        </Flex>
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
