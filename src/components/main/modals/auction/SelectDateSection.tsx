import { Flex, Text, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { IoCalendarOutline } from 'react-icons/io5';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectDateSectionProps {
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

export default function SelectDateSection({ endDate, setEndDate }: SelectDateSectionProps) {
  return (
    <Flex direction="column" flex={1} marginRight="3">
      <Flex alignItems="center" marginBottom="4px">
        <Text fontSize={16} fontWeight="semibold">
          경매 종료 날짜
        </Text>
        <Text fontSize={14} color="red" marginLeft={1}>
          *필수
        </Text>
      </Flex>
      <InputGroup zIndex={10}>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          dateFormat="yyyy/MM/dd"
          placeholderText="날짜를 선택해주세요"
          customInput={<Input borderColor={'rgba(200,200,200,1)'} fontSize={'0.95rem'} readOnly />}
          popperClassName="zIndexFix"
          required={true}
        />
        <InputRightElement pointerEvents="none">
          <IoCalendarOutline color="gray.300" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
