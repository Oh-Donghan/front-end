import { Flex, Text, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { IoCalendarOutline } from 'react-icons/io5';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectDateSectionProps {
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

export default function SelectDateSection({ endDate, setEndDate }: SelectDateSectionProps) {
  const handleDateChange = (date: Date) => {
    if (!date) return;

    const now = new Date();
    date.setHours(now.getHours());
    date.setMinutes(now.getMinutes());
    date.setSeconds(now.getSeconds());
    date.setMilliseconds(now.getMilliseconds());

    setEndDate(date);
  };

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
      <InputGroup>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => handleDateChange(date)}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          dateFormat="yyyy/MM/dd"
          placeholderText="날짜를 선택해주세요"
          popperPlacement="bottom"
          customInput={
            <Input
              borderColor={'rgba(200,200,200,1)'}
              fontSize={'0.95rem'}
              readOnly
              cursor={'pointer'}
            />
          }
        />
        <InputRightElement pointerEvents="none">
          <IoCalendarOutline color="gray.300" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
