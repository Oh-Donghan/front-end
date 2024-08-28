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
        <Flex
          fontWeight={'semibold'}
          fontSize={{ base: '1rem', md: '1.2rem' }}
          gap={3}
          isTruncated
          padding={'2px'}
          paddingX={'6px'}
        >
          {days === 0 ? null : (
            <Flex align={'end'}>
              <Text>{days}</Text>{' '}
              <Text
                fontSize={{ base: '0.7rem', md: '0.8rem' }}
                marginBottom={{ base: '1px', md: '2px' }}
                color={'rgba(90,90,90,1)'}
              >
                일{' '}
              </Text>
            </Flex>
          )}
          <Flex align={'end'}>
            <Text> {String(hours).padStart(2, '0')}</Text>{' '}
            <Text
              fontSize={{ base: '0.7rem', md: '0.8rem' }}
              marginBottom={{ base: '1px', md: '2px' }}
              color={'rgba(90,90,90,1)'}
            >
              시간{' '}
            </Text>
          </Flex>
          <Flex align={'end'}>
            <Text> {String(minutes).padStart(2, '0')}</Text>{' '}
            <Text
              fontSize={{ base: '0.7rem', md: '0.8rem' }}
              marginBottom={{ base: '1px', md: '2px' }}
              color={'rgba(90,90,90,1)'}
            >
              분{' '}
            </Text>
          </Flex>
          <Flex align={'end'}>
            <Text> {String(seconds).padStart(2, '0')}</Text>{' '}
            <Text
              fontSize={{ base: '0.7rem', md: '0.8rem' }}
              marginBottom={{ base: '1px', md: '2px' }}
              color={'rgba(90,90,90,1)'}
            >
              초{' '}
            </Text>
          </Flex>
        </Flex>
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
