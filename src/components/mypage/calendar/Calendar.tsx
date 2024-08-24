import { Flex } from '@chakra-ui/react';
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

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(date);
      onDateChange(date, date);
    } else {
      onDateChange(date, endDate);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange(startDate, date);
  };

  return (
    <Flex direction={'column'} gap={1} marginBottom={'20px'}>
      {isInfo && <div>포인트 사용 내역</div>}
      <Flex alignItems={'center'}>
        <div className="flex items-center relative">
          <DatePicker
            className="border border-slate-400 rounded-md w-40 px-8 py-1"
            dateFormat="yyyy.MM.dd"
            shouldCloseOnSelect
            selected={startDate}
            onChange={handleStartDateChange}
          />
          <span className="absolute left-2">
            <FaCalendarAlt />
          </span>
        </div>
        <div className="px-1">
          <FaMinus />
        </div>
        <div className="flex items-center relative">
          <DatePicker
            className="border border-slate-400 rounded-md w-40 px-8 py-1"
            dateFormat="yyyy.MM.dd"
            minDate={startDate}
            shouldCloseOnSelect
            selected={endDate}
            onChange={handleEndDateChange}
          />
          <span className="absolute left-2">
            <FaCalendarAlt />
          </span>
        </div>
      </Flex>
    </Flex>
  );
}
