import { Flex, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';

interface CalendarProps {
  isInfo: boolean;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function Calendar({ isInfo, onDateChange }: CalendarProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // const handleSearch = () => {
  //   if (startDate && endDate) {
  //     console.log(`기간: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  //     onDateChange(startDate, endDate);
  //   } else {
  //     console.log('시작 날짜와 끝나는 날짜를 모두 선택해주세요.');
  //   }
  // };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end); // 부모 컴포넌트로 날짜 전달
  };

  return (
    <Flex w={'368px'} direction={'column'} gap={1} marginBottom={'20px'}>
      {isInfo && (
        <Flex>
          <div>포인트 사용 내역</div>
          <Spacer />
          {/* <div onClick={handleSearch}>조회</div> */}
          <div>조회</div>
        </Flex>
      )}
      <Flex alignItems={'center'}>
        <div className="flex items-center relative">
          <DatePicker
            className="border border-slate-400 rounded-md w-40 px-8 py-1"
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            selected={startDate}
            onChange={(date: Date | null) => handleDateChange(date, endDate)}
          />
          <span className="absolute left-2">
            <FaCalendarAlt />
          </span>
        </div>
        <div className="px-4">
          <FaMinus />
        </div>
        <div className="flex items-center relative">
          <DatePicker
            className="border border-slate-400 rounded-md w-40 px-8 py-1"
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            selected={endDate}
            onChange={(date: Date | null) => handleDateChange(startDate, date)}
          />
          <span className="absolute left-2">
            <FaCalendarAlt />
          </span>
        </div>
      </Flex>
    </Flex>
  );
}
