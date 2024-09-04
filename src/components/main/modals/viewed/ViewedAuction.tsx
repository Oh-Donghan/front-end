import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface ViewedAuctionType {
  data: { auctionState: string; id: number; thumbnailUrl: string; title: string };
}

export default function ViewedAuction({ data }: ViewedAuctionType) {
  return (
    <Link to={`/detail/${data.id}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        py={['6px', '10px']}
        pl={['6px', '14px']}
        pr={['12px', '20px']}
        _hover={{ bgColor: 'rgba(240,240,240,1)' }}
      >
        <Flex alignItems={'center'}>
          <Box
            width={['32px', '54px']}
            height={['32px', '54px']}
            bgColor={'rgba(230,230,230,1)'}
            borderRadius={'50%'}
            marginRight={['8px', '14px']}
            overflow={'hidden'}
          >
            <Image src={data.thumbnailUrl} alt={data.title} />
          </Box>
          <Text maxW={'550px'} fontSize={['14px', '16px']} noOfLines={1}>
            {data.title}
          </Text>
        </Flex>
        <Text
          fontSize={['xs', 'sm']}
          fontWeight={'normal'}
          color={data.auctionState === 'CONTINUE' ? 'rgb(49, 130, 206)' : 'rgba(150,150,150,1)'}
        >
          {data.auctionState === 'CONTINUE' ? '진행중' : '거래종료'}
        </Text>
      </Flex>
    </Link>
  );
}
