import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { IoChevronDownSharp } from 'react-icons/io5';
import HistoryPagination from './HistoryPagination';
import Calendar from '../calendar/Calendar';

const sampleData1 = [
  { type: '충전', date: '2024-08-04 (일) 16:09:40', balance: '205,000P', amount: '+15000P' },
  { type: '사용', date: '2024-08-04 (일) 16:09:40', balance: '190,000P', amount: '-3000P' },
  { type: '충전', date: '2024-08-04 (일) 16:09:40', balance: '187,000P', amount: '+30000P' },
  { type: '충전', date: '2024-08-04 (일) 16:09:40', balance: '157,000P', amount: '+5000P' },
  { type: '충전', date: '2024-08-04 (일) 16:09:40', balance: '155,000P', amount: '+2000P' },
  { type: '충전', date: '2024-08-04 (일) 16:09:40', balance: '148,000P', amount: '+7000P' },
  { type: '사용', date: '2024-08-04 (일) 16:09:40', balance: '158,000P', amount: '-10000P' },
];

export default function RechargeHistory() {
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
        <Calendar isInfo={false} />
        <Input w="200px" h="34px" />
        <Button h="34px">조회</Button>
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
      <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
        <Tbody>
          {sampleData1.map((transaction, index) => (
            <Tr key={index}>
              <Td className="w-20 bg-gray-200 text-center font-bold">{transaction.type}</Td>
              <Td>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <span>{transaction.date}</span>
                  </Box>
                  <Box textAlign="right" className="flex gap-8">
                    <span className="block">{transaction.balance}</span>
                    <span
                      className={`block w-24 ${
                        transaction.amount.startsWith('+') ? 'text-blue-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.amount}
                    </span>
                  </Box>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HistoryPagination />
    </Box>
  );
}
