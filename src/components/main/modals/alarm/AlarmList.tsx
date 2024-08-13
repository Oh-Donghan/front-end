import { Flex } from '@chakra-ui/react';
import Alarm from './Alarm';

export default function AlarmList() {
  const datas = [
    {
      id: 1,
      type: 'QUESTION', // 문의글 알림
      content: 'OOO님께서 Q&A 질문을 남겼습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 2,
      type: 'DONE', // 경매 종료
      content: 'OOO 경매가 종료되었습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 3,
      type: 'CHANGE_BID', // 입찰가 변동
      content: 'OOO 경매의 최고 입찰가가 변경되었습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 4,
      type: 'CONFIRM', // 구매 확정 알림
      content: 'OOO 경매의 구매가 확정 되었습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 5,
      type: 'ANSWER', // 답변 알림
      content: 'OOO님께서 올린 질문에 답변이 달렸습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 6,
      type: 'QUESTION',
      content: 'OOO님께서 Q&A 질문을 남겼습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
    {
      id: 7,
      type: 'QUESTION',
      content: 'OOO님께서 Q&A 질문을 남겼습니다.',
      createdAt: '2024-08-03T11:12:13',
    },
  ];

  return (
    <Flex
      direction={'column'}
      height={'272px'}
      overflowY={'scroll'}
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}
    >
      {datas.map(data => {
        return (
          <Alarm key={data.id} type={data.type} content={data.content} createdAt={data.createdAt} />
        );
      })}
    </Flex>
  );
}
