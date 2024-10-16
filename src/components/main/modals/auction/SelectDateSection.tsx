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

    setEndDate(date);
  };

  // 현재 시간보다 이전 시간은 선택할 수 없도록 필터링하는 함수
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return selectedDate.getTime() > currentDate.getTime();
  };

  return (
    <Flex direction="column" flex={1} marginRight="3" w={'full'}>
      <Flex alignItems="center" marginBottom="4px">
        <Text fontSize={16} fontWeight="semibold">
          경매 종료 날짜
        </Text>
        <Text fontSize={14} color="red" marginLeft={1}>
          *필수
        </Text>
      </Flex>
      <Flex gap={6}>
        {/* 날짜 선택 */}
        <InputGroup flex={1}>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => handleDateChange(date)}
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
            dateFormat="yyyy/MM/dd"
            placeholderText="날짜를 선택해주세요"
            popperPlacement="bottom"
            portalId="date-picker-portal"
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

        {/* 시간 선택 */}
        <InputGroup flex={1}>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => handleDateChange(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="시간을 선택해주세요"
            filterTime={filterPassedTime}
            popperPlacement="bottom"
            portalId="date-picker-portal"
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
    </Flex>
  );
}
