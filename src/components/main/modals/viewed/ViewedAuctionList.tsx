import { Flex } from '@chakra-ui/react';
import ViewedAuction from './ViewedAuction';

export default function ViewedAuctionList() {
  const datas = [
    {
      id: 1,
      title: '메시 국대 유니폼',
      ongoing: true,
    },
    {
      id: 2,
      title: '마이클 조던 농구화',
      ongoing: true,
    },
    {
      id: 3,
      title: '삼천리 자전거',
      ongoing: true,
    },
    {
      id: 4,
      title: '중고 유모차',
      ongoing: false,
    },
    {
      id: 5,
      title: '다이슨 청소기',
      ongoing: false,
    },
  ];

  return (
    <Flex
      direction={'column'}
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
        return <ViewedAuction key={data.id} title={data.title} ongoing={data.ongoing} />;
      })}
    </Flex>
  );
}
