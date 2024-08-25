import Banner from '../components/main/banner/Banner';
import Categories from '../components/main/categories/Categories';
import SwiperItemList from '../components/main/item/ItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Input from '../components/main/input/input';
import { Link } from 'react-router-dom';
import TopButton from '../components/common/button/TopButton';
import { useState } from 'react';

export default function Home() {
  const [isNoItem, setIsNoItem] = useState(false);

  return (
    <Box minW="375px">
      <TopButton />
      <ChatModal />
      <Banner />
      <Input />
      <Categories />
      {isNoItem ? (
        <Flex w={'full'} h="450px" align={'center'} justify={'center'}>
          <Flex direction={'column'} align={'center'} gap={2}>
            <Text fontWeight={'bold'} fontSize={{ base: '1.1rem', md: '1.4rem' }}>
              {'현재 진행중인 경매가 없습니다.'}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Box minW="375px" px={8} overflowX="hidden">
          {/* 지금 핫한 Top5 섹션 */}
          <Box minW="375px" mt={{ base: '12', sm: '75px' }}>
            <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
                지금 핫한 경매 Top5
              </Text>
            </Flex>
            <SwiperItemList type="hot" setIsNoItem={setIsNoItem} />
          </Box>

          {/* 전체 매물 섹션 */}
          <Box minW="375px" mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
            <Flex alignItems="end" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
              <Text fontSize={{ base: 'xl', sm: '1.5rem' }} fontWeight="bold">
                전체 경매
              </Text>
              <Flex alignItems={'end'} cursor="pointer" ml={2} color="gray.500">
                <Text fontSize={20}>+</Text>
                <Link to={`/auctions?category=전체`}>
                  <Text>더보기</Text>
                </Link>
              </Flex>
            </Flex>
            <SwiperItemList setIsNoItem={setIsNoItem} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
