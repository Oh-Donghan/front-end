import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { GoChevronRight } from 'react-icons/go';
import ItemList from '../components/listpage/ItemList';
import SwiperItemList from '../components/main/item/ItemList';
import ChatModal from '../components/main/modals/chat/ChatModal';
import SortButton from '../components/listpage/SortButton';
import Input from '../components/listpage/input';

import book from '../assets/image/category/book.png';
import man_cloth from '../assets/image/category/man_cloth.png';
import woman_cloth from '../assets/image/category/woman_cloth.png';
import kidult from '../assets/image/category/kidult.png';
import computer from '../assets/image/category/computer.png';
import baby from '../assets/image/category/baby.png';
import goods from '../assets/image/category/goods.png';
import food from '../assets/image/category/food.png';
import beauty from '../assets/image/category/beauty.png';
import pet from '../assets/image/category/pet.png';
import bed from '../assets/image/category/bed.png';
import sport from '../assets/image/category/sport.png';
import house from '../assets/image/category/house.png';
import plant from '../assets/image/category/plant.png';
import ring from '../assets/image/category/ring.png';
import more from '../assets/image/category/more.png';

const categories = {
  전체: {
    sub: [
      '남성의류',
      '여성의류',
      '키덜트',
      '가전제품',
      '도서제품',
      '유아용품',
      '굿즈',
      '식품',
      '뷰티',
      '반려동물',
      '가구',
      '스포츠',
      '생활용품',
      '식물',
      '익세사리',
      '기타',
    ],
    img: man_cloth,
  },
  남성의류: { sub: ['셔츠', '바지', '자켓', '코트', '액세서리'], img: man_cloth },
  여성의류: { sub: ['드레스', '블라우스', '스커트', '코트', '가방'], img: woman_cloth },
  키덜트: { sub: ['피규어', '레고', '보드게임', '모형', '퍼즐'], img: kidult },
  가전제품: { sub: ['노트북', '스마트폰', 'TV', '카메라', '오디오'], img: computer },
  도서제품: { sub: ['소설', '자기계발서', '만화책', '전문서적', '전자책'], img: book },
  유아용품: { sub: ['기저귀', '아기옷', '유모차', '장난감', '아기침대'], img: baby },
  굿즈: {
    sub: ['아이돌 굿즈', '애니메이션 굿즈', '게임 굿즈', '영화 굿즈', '기타 굿즈'],
    img: goods,
  },
  식품: { sub: ['과자', '음료수', '반찬', '즉석식품', '과일'], img: food },
  뷰티: { sub: ['화장품', '헤어케어', '바디케어', '향수', '네일'], img: beauty },
  반려동물: { sub: ['사료', '장난감', '목욕용품', '옷', '훈련용품'], img: pet },
  가구: { sub: ['의자', '책상', '침대', '소파', '수납장'], img: bed },
  스포츠: { sub: ['운동기구', '운동복', '신발', '야외활동 용품', '스포츠 용품'], img: sport },
  생활용품: { sub: ['청소도구', '조리도구', '세제', '조명', '소형가전'], img: house },
  식물: { sub: ['화분', '씨앗', '비료', '정원도구', '인테리어 식물'], img: plant },
  악세사리: { sub: ['목걸이', '귀걸이', '반지', '팔찌', '시계'], img: ring },
  기타: { sub: ['기타1', '기타2', '기타3', '기타4', '기타5'], img: more },
};

export default function AuctionList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const subCategory = searchParams.get('sub');
  const subCategories = categories[category].sub;

  const showSearchButton = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (!showSearchButton) {
      setIsSearchOpen(false);
    }
  }, [showSearchButton]);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <Box minW="442px" px={8} overflowX="hidden">
      <ChatModal />
      {/* 카테고리와 서브카테고리 네비게이션 */}
      <Box pt="30px">
        <Flex alignItems="center" fontSize="14px" color="rgba(90,90,90,1)" pl="6px">
          {category !== '전체' ? (
            <>
              <Text>전체 경매</Text>
              <GoChevronRight className="mx-1" />
              <Text>{category}</Text>
              {subCategory && (
                <>
                  <GoChevronRight className="mx-1" />
                  <Text>{subCategory}</Text>
                </>
              )}
            </>
          ) : (
            <>
              <Text>전체 경매</Text>
            </>
          )}
        </Flex>
        <Flex alignItems={'center'} marginTop={'20px'}>
          <img
            src={categories[category].img}
            alt=""
            width={'28px'}
            height={'28px'}
            className="ml-1 mb-0.5"
          />
          <Text fontSize="26px" fontWeight="bold" pl="6px" ml="3px">
            {category}
          </Text>
        </Flex>

        {/* 반응형 서브카테고리 및 기타 요소 네비게이션 */}
        <Flex
          mt="16px"
          fontSize="16px"
          overflowX="auto"
          whiteSpace="nowrap"
          alignItems="center"
          css={{
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#E2E8F0', // 스크롤바 손잡이의 색상
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F7FAFC', // 스크롤바 트랙의 색상
            },
          }}
        >
          <Flex alignItems="center" justifyContent={'space-between'} width={'full'}>
            <Flex>
              <Link to={`/auctions?category=${category}`} className="mr-2">
                <Button
                  size={{ base: 'xs', sm: 'sm' }}
                  variant={!subCategory ? 'solid' : 'outline'}
                  colorScheme={!subCategory ? 'blue' : 'gray'}
                  leftIcon={!subCategory ? <FaCheck /> : null}
                >
                  전체
                </Button>
              </Link>
              {subCategories?.map((sub, i) => (
                <Link
                  to={
                    category !== '전체'
                      ? `/auctions?category=${category}&sub=${sub}`
                      : `/auctions?category=${sub}`
                  }
                  key={i}
                  className="mr-2"
                >
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    variant={sub === subCategory ? 'solid' : 'outline'}
                    colorScheme={sub === subCategory ? 'blue' : 'gray'}
                    leftIcon={sub === subCategory ? <FaCheck /> : null}
                  >
                    {sub}
                  </Button>
                </Link>
              ))}
            </Flex>
            <Flex>
              <Box display={{ base: 'none', lg: 'block' }} ml={2}>
                <Input />
              </Box>
              {showSearchButton && (
                <IconButton
                  icon={<FaSearch size={13} color="rgba(100,100,100,1)" />}
                  border={'1px solid rgba(210,210,210,1)'}
                  aria-label="Search"
                  onClick={handleSearchIconClick}
                  variant="outline"
                  size={'sm'}
                  ml={2}
                />
              )}
              <Flex cursor="pointer" ml={2} color="gray.500">
                <SortButton />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* 버튼 아래에 Input이 나타나도록 구현 */}
      {isSearchOpen && (
        <Box mb={{ base: '4', sm: '5' }} mt={'5'}>
          <Input />
        </Box>
      )}

      {/* 지금 핫한 Top5 섹션 */}
      <Box mt={{ base: '12', sm: '60px' }}>
        <Flex alignItems="center" mb={{ base: '4', sm: '5' }}>
          <Text fontSize={{ base: '1.3rem', md: '1.5rem' }} fontWeight="bold">
            {category !== '전체' ? `지금 핫한 ${category} Top5` : '지금 핫한 Top5'}
          </Text>
        </Flex>
        <SwiperItemList type="hot" />
      </Box>

      {/* 전체 매물 섹션 */}
      <Box mb={{ base: '12', sm: '20' }} mt={{ base: '12', sm: '20' }}>
        <Flex alignItems="center" justifyContent="space-between" mb={{ base: '4', sm: '5' }}>
          <Text fontSize={{ base: '1.3rem', md: '1.5rem' }} fontWeight="bold">
            {category !== '전체' ? `전체 ${category} 경매` : '전체 경매'}
          </Text>
        </Flex>
        <ItemList />
      </Box>
    </Box>
  );
}
