import { Box, Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import Calendar from '../calendar/Calendar';
import OrderTable from './OrderTable';
import HistoryPagination from './HistoryPagination';

export default function PurchaseHistory() {
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
      <OrderTable />
      <HistoryPagination />
    </Box>
  );
}
