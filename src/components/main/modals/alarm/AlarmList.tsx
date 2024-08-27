import { Flex, Spinner, Text } from '@chakra-ui/react';
import Alarm from './Alarm';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAlarms } from '../../../../axios/alarm/alarm';

export default function AlarmList() {
  // const datas = [
  //   {
  //     id: 1,
  //     type: 'QUESTION', // 문의글 알림
  //     content: 'OOO님께서 Q&A 질문을 남겼습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  //   {
  //     id: 2,
  //     type: 'DONE', // 경매 종료
  //     content: 'OOO 경매가 종료되었습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  //   {
  //     id: 4,
  //     type: 'CONFIRM', // 구매 확정 알림
  //     content: 'OOO 경매의 구매가 확정 되었습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  //   {
  //     id: 5,
  //     type: 'ANSWER', // 답변 알림
  //     content: 'OOO님께서 올린 질문에 답변이 달렸습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  //   {
  //     id: 6,
  //     type: 'QUESTION',
  //     content: 'OOO님께서 Q&A 질문을 남겼습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  //   {
  //     id: 7,
  //     type: 'QUESTION',
  //     content: 'OOO님께서 Q&A 질문을 남겼습니다.',
  //     createdAt: '2024-08-03T11:12:13',
  //   },
  // ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['alarm'],
    queryFn: ({ pageParam = 0 }) => getAlarms({ pageParam }),
    getNextPageParam: lastPage => {
      return lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined;
    },
    initialPageParam: 0,
  });

  if (isLoading) {
    return (
      <Flex w={'100%'} h={['200px', '272px']} align={'center'} justify={'center'}>
        {' '}
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex w={'100%'} h={['200px', '272px']} align={'center'} justify={'center'}>
      {' '}
      <Text
        color={'rgba(90,90,90,1)'}
        fontSize={'1.1rem'}
        fontWeight={'semibold'}
        marginBottom={'8px'}
        letterSpacing={'0.07rem'}
      >
        현재 등록된 알림이 없습니다.
      </Text>
    </Flex>
  );

  // return (
  //   <>
  //     {data?.content.length === 0 ? (
  //       <Flex w={'100%'} h={['200px', '272px']} align={'center'} justify={'center'}>
  //         {' '}
  //         <Text>현재 존재하는 알림이 없습니다.</Text>
  //       </Flex>
  //     ) : (
  //       <Flex
  //         direction={'column'}
  //         maxHeight={['200px', '272px']}
  //         overflowY={'scroll'}
  //         sx={{
  //           '::-webkit-scrollbar': {
  //             display: 'none',
  //           },
  //           '-ms-overflow-style': 'none',
  //           'scrollbar-width': 'none',
  //         }}
  //         onScroll={e => {
  //           const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  //           if (scrollTop + clientHeight >= scrollHeight && hasNextPage && !isFetchingNextPage) {
  //             fetchNextPage();
  //           }
  //         }}
  //       >
  //         {data.pages.map(page =>
  //           page.content.map(alarm => (
  //             <Alarm
  //               key={alarm.id}
  //               type={alarm.notificationType}
  //               content={alarm.content}
  //               createdAt={alarm.createdAt}
  //             />
  //           )),
  //         )}

  //         {isFetchingNextPage && <Spinner size="lg" />}
  //       </Flex>
  //     )}
  //   </>
  // );
}
