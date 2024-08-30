import { Flex, Spinner, Text } from '@chakra-ui/react';
import Alarm from './Alarm';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAlarms } from '../../../../axios/alarm/alarm';

export default function AlarmList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['alarm'],
    queryFn: ({ pageParam = 0 }) => getAlarms({ page: pageParam }),
    getNextPageParam: lastPage => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
    initialPageParam: 0,
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

  if (data?.pages[0].content.length === 0) {
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
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
      onScroll={e => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
    >
      {data?.pages.map(page =>
        page.content.map(alarm => (
          <Alarm
            key={alarm.id}
            type={alarm.notificationType}
            content={alarm.content}
            createdAt={alarm.createdAt}
          />
        )),
      )}

      {isFetchingNextPage && <Spinner size="lg" />}
    </Flex>
  );
}
