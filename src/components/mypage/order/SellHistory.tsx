import { Box, Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchSellHistoryData } from '../../../axios/mocks/order/sellHistory';

export default function SellHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Tanstack Query를 사용하여 데이터를 패칭
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/transactions/sales'],
    queryFn: fetchSellHistoryData,
  });

  const currentData =
    data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box flex={1} flexDirection={'column'} className="p-4 flex">
      <Flex gap={4}>
        <Menu>
          <MenuButton
            w="90px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            최근순
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm">최근순</MenuItem>
            <MenuItem fontSize="sm">나중순</MenuItem>
            <MenuItem fontSize="sm">최근순</MenuItem>
            <MenuItem fontSize="sm">최근순</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            w="90px"
            h="34px"
            fontSize="sm"
            as={Button}
            rightIcon={<IoChevronDownSharp />}
          >
            최근순
          </MenuButton>
          <MenuList>
            <MenuItem fontSize="sm">최근순</MenuItem>
            <MenuItem fontSize="sm">나중순</MenuItem>
            <MenuItem fontSize="sm">최근순</MenuItem>
            <MenuItem fontSize="sm">최근순</MenuItem>
          </MenuList>
        </Menu>
        <Calendar isInfo={false} />
        <Input w="200px" h="34px" />
        <Button h="34px">조회</Button>
      </Flex>
      <OrderTable posts={currentData} />
      <HistoryPagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
