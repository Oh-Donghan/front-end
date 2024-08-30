import { Flex, Text, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { IoCalendarOutline } from 'react-icons/io5';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectDateSectionProps {
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

export default function SelectDateSection({ endDate, setEndDate }: SelectDateSectionProps) {
  const handleDateChange = (date: Date) => {
    if (!date) return;

    // 현재 시간을 가져옵니다.
    const now = new Date();

    // 선택한 날짜에 현재 시간을 설정합니다.
    date.setHours(now.getHours());
    date.setMinutes(now.getMinutes());
    date.setSeconds(now.getSeconds());
    date.setMilliseconds(now.getMilliseconds());

    setEndDate(date); // 설정된 날짜를 상태로 업데이트합니다.
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
      <InputGroup zIndex={10}>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => handleDateChange(date)}
          minDate={new Date()}
          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          dateFormat="yyyy/MM/dd"
          placeholderText="날짜를 선택해주세요"
          customInput={<Input borderColor={'rgba(200,200,200,1)'} fontSize={'0.95rem'} readOnly />}
          popperClassName="zIndexFix"
        />
        <InputRightElement pointerEvents="none">
          <IoCalendarOutline color="gray.300" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}
