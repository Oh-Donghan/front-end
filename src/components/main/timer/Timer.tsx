import { Flex, Text } from '@chakra-ui/react';
import Countdown from 'react-countdown';

interface TimerProps {
  endedAt?: string;
  setIsFinished?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({ endedAt, setIsFinished }: TimerProps) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsFinished(true);
      return <span className="text-red-500 font-bold">경매가 종료되었습니다.</span>;
    } else {
      return (
        <div className="text-center px-2 py-1 bg-gray-100 rounded-lg shadow-md">
          <Flex align={'end'} gap={2}>
            {days === 0 ? null : (
              <Flex align={'center'}>
                <Text color={'rgba(50,50,50,1)'} fontSize={'1rem'} fontWeight={'semibold'}>
                  {days}
                </Text>
                <Text color={'rgba(50,50,50,1)'} mt={'2px'} ml={'1.5px'} fontSize={'0.8rem'}>
                  일
                </Text>
              </Flex>
            )}
            <Flex align={'center'}>
              <Text color={'rgba(50,50,50,1)'} fontSize={'1rem'} fontWeight={'semibold'}>
                {String(hours).padStart(2, '0')}
              </Text>
              <Text color={'rgba(50,50,50,1)'} mt={'2px'} ml={'1.5px'} fontSize={'0.8rem'}>
                시간
              </Text>{' '}
            </Flex>{' '}
            <Flex align={'center'}>
              <Text color={'rgba(50,50,50,1)'} fontSize={'1rem'} fontWeight={'semibold'}>
                {String(minutes).padStart(2, '0')}
              </Text>
              <Text color={'rgba(50,50,50,1)'} mt={'2px'} ml={'1.5px'} fontSize={'0.8rem'}>
                분
              </Text>
            </Flex>{' '}
            <Flex align={'center'}>
              <Text color={'rgba(50,50,50,1)'} fontSize={'1rem'} fontWeight={'semibold'}>
                {String(seconds).padStart(2, '0')}
              </Text>
              <Text color={'rgba(50,50,50,1)'} mt={'2px'} ml={'1.5px'} fontSize={'0.8rem'}>
                초
              </Text>
            </Flex>
          </Flex>
        </div>
      );
    }
  };

  const endDate = endedAt ? new Date(endedAt) : new Date();

  return (
    <div className="flex items-center justify-center bg-blue-50">
      <Countdown date={endDate} renderer={renderer} />
    </div>
  );
}
