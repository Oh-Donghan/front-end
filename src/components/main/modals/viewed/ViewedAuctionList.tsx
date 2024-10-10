import { Flex, Text } from '@chakra-ui/react';
import ViewedAuction from './ViewedAuction';
import { useEffect, useState } from 'react';

export default function ViewedAuctionList() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    let storedData;
    if (memberId) {
      storedData = localStorage.getItem(memberId);
    } else {
      storedData = localStorage.getItem('null');
    }

    // JSON 형식의 데이터만 파싱
    try {
      const parsedData = JSON.parse(storedData);

      // parsedData가 배열인 경우에만 상태로 설정
      if (Array.isArray(parsedData)) {
        setDatas(parsedData);
      } else {
        // JSON 형식이 아닌 경우에는 처리하지 않음
        console.error('Stored data is not a valid JSON array.');
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      // JSON 파싱에 실패하면 그냥 처리하지 않음
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
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
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
