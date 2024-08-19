import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPurchaseHistoryData } from '../../../axios/mocks/order/purchaseHistory';

export default function PurchaseHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState('');
  const [transType, setTransType] = useState(''); // 추가된 상태
  const [sorted, setSorted] = useState('recent'); // 정렬 기준 상태 추가
  const itemsPerPage = 5;

  // Tanstack Query를 사용하여 데이터를 패칭
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/transactions/purchases', currentPage, searchWord, transType, sorted],
    queryFn: () =>
      fetchPurchaseHistoryData(currentPage, itemsPerPage, searchWord, transType, sorted),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleTransTypeChange = (type: string) => {
    setTransType(type);
    setCurrentPage(1);
  };

  const handleSortChange = (sortOption: string) => {
    setSorted(sortOption);
    setCurrentPage(1); // 정렬이 변경될 때 페이지 초기화
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
            {transType || '전체'}
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('')}>
              전체
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('CONTINUE')}>
              진행 중
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleTransTypeChange('END')}>
              종료
            </MenuItem>
          </MenuList>
        </Menu>

        <Calendar isInfo={false} />
        <Input
          w="200px"
          h="34px"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <Button h="34px" onClick={handleSearch}>
          조회
        </Button>
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
