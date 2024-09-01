import { Flex, Spinner, Text } from '@chakra-ui/react';
import Alarm from './Alarm';
import { useQuery } from '@tanstack/react-query';
import { getAlarms } from '../../../../axios/alarm/alarm';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function AlarmList() {
  const { data, isLoading } = useQuery({
    queryKey: ['alarm'],
    queryFn: () => getAlarms(),
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <Flex w={'100%'} h={['200px', '272px']} align={'center'} justify={'center'}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (data.length === 0) {
    return (
      <Flex w={'100%'} h={['200px', '272px']} align={'center'} justify={'center'}>
        <Text
          color={'rgba(90,90,90,1)'}
          fontSize={'1.05rem'}
          fontWeight={'normal'}
          marginBottom={'8px'}
          letterSpacing={'0.07rem'}
        >
          현재 등록된 알림이 없습니다.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction={'column'}
      maxHeight={['200px', '272px']}
      overflowY={'scroll'}
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none', // '-ms-overflow-style' -> 'msOverflowStyle'
        scrollbarWidth: 'none',
      }}
    >
      {data?.map(alarm => (
        <Alarm
          key={alarm.id}
          type={alarm.notificationType}
          content={alarm.content}
          createdAt={alarm.createdAt}
          auctionId={alarm.auctionId}
        />
      ))}
    </Flex>
  );
}
