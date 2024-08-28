import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa6';

export default function Calendar({ onDateChange }) {
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
    <Flex alignItems={'center'}>
      <div className="flex items-center relative">
        <DatePicker
          className="border border-slate-400 rounded-md w-full max-w-36 pl-8 pr-4 py-1"
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
          className="border border-slate-400 rounded-md w-full max-w-36 pl-8 pr-4 py-1"
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
  );
}
