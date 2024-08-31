import { Flex, Text } from '@chakra-ui/react';
import ViewedAuction from './ViewedAuction';
import { useEffect, useState } from 'react';

export default function ViewedAuctionList() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    const storedData = localStorage.getItem('null');
    if (storedData) {
      console.log(storedData);
      setDatas(JSON.parse(storedData));
    }
  }, []);

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
      {datas.length !== 0 ? (
        <>
          {datas.map(data => {
            return <ViewedAuction key={data.id} data={data} />;
          })}
        </>
      ) : (
        <Flex align={'center'} justify={'center'} w={'full'} height={'240px'}>
          <Text fontWeight={'normal'} color={'rgba(70,70,70,1)'}>
            존재하는 경매가 없습니다.
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
