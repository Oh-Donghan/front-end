import { Flex, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleSearch = () => {
    if (startDate && endDate) {
      console.log(`기간: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    } else {
      console.log('시작 날짜와 끝나는 날짜를 모두 선택해주세요.');
    }
  };

  return (
    <Flex width={'450px'} direction={'column'} gap={1} marginBottom={'20px'} bgColor={'lavender'}>
      <Flex>
        <div>포인트 사용 내역</div>
        <Spacer />
        <div onClick={handleSearch}>조회</div>
      </Flex>
      <Flex alignItems={'center'} gap={2} justifyContent={'space-between'}>
        <DatePicker
          className="px-2 py-1 border border-slate-400 rounded-md"
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
        />
        {/* <div>----</div> */}
        <DatePicker
          className="px-2 py-1 border border-slate-400 rounded-md"
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
        />
      </Flex>
    </Flex>
  );
}
