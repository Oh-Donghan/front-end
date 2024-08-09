import {
  Grid,
  GridItem,
  Box,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
  Text,
} from '@chakra-ui/react';
import man_cloth from '../../../assets/image/category/man_cloth.png';
import woman_cloth from '../../../assets/image/category/woman_cloth.png';
import kidult from '../../../assets/image/category/kidult.png';
import computer from '../../../assets/image/category/computer.png';
import book from '../../../assets/image/category/book.png';
import baby from '../../../assets/image/category/baby.png';
import goods from '../../../assets/image/category/goods.png';
import food from '../../../assets/image/category/food.png';
import beauty from '../../../assets/image/category/beauty.png';
import pet from '../../../assets/image/category/pet.png';
import bed from '../../../assets/image/category/bed.png';
import sport from '../../../assets/image/category/sport.png';
import house from '../../../assets/image/category/house.png';
import plant from '../../../assets/image/category/plant.png';
import ring from '../../../assets/image/category/ring.png';
import more from '../../../assets/image/category/more.png';
import { IoChevronDownSharp } from 'react-icons/io5';
import { useState } from 'react';

const data = [
  { id: 1, title: '남성의류', image: man_cloth },
  { id: 2, title: '여성의류', image: woman_cloth },
  { id: 3, title: '키덜트', image: kidult },
  { id: 4, title: '가전제품', image: computer },
  { id: 5, title: '도서제품', image: book },
  { id: 6, title: '유아용품', image: baby },
  { id: 7, title: '굿즈', image: goods },
  { id: 8, title: '식품', image: food },
  { id: 9, title: '뷰티', image: beauty },
  { id: 10, title: '반려용품', image: pet },
  { id: 11, title: '가구', image: bed },
  { id: 12, title: '스포츠', image: sport },
  { id: 13, title: '생활용품', image: house },
  { id: 14, title: '식물', image: plant },
  { id: 15, title: '악세사리', image: ring },
  { id: 16, title: '기타', image: more },
];

export default function Categories() {
  const [selectedOption, setSelectedOption] = useState({
    title: '카테고리를 선택해주세요',
    image: man_cloth,
  });

  const handleSelect = item => {
    setSelectedOption(prev => ({ ...prev, title: item.title, image: item.image }));
  };

  return (
    <>
      <div className="block sm:hidden mt-4 px-6 relative z-50">
        <Menu isLazy matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<IoChevronDownSharp />}
            bg={'white'}
            border={'1px'}
            borderColor="gray.400"
            width={'full'}
            justifyContent="flex-start"
            textAlign="left"
          >
            <Flex align="start">
              <Image
                src={selectedOption.image}
                alt="category image"
                boxSize="1.3rem"
                mr="9px"
                marginLeft={'-6px'}
              />
              <Text color={'rgba(150,150,150,1)'} fontWeight={'normal'}>
                {selectedOption.title}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList maxH="220px" overflowY="auto" width={'100%'}>
            {' '}
            {data.map(item => (
              <MenuItem
                key={item.id}
                value={item.title}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                <Flex align="center">
                  <Image src={item.image} alt="" boxSize="1.3rem" mr="9px" marginLeft={'-2px'} />
                  <Text>{item.title}</Text>
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      <Box
        className="hidden sm:block"
        width={'100%'}
        minWidth={{ base: '100%', md: '700px' }}
        maxWidth={{ base: '800px', lg: '1200px' }}
        margin="60px auto 0"
        padding={{ base: '0px 25px 0px 55px', md: '0px 50px' }}
      >
        <Grid
          templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)', lg: 'repeat(8, 1fr)' }}
          gap={{ base: '6', md: '8', lg: '12' }}
        >
          {data.map(item => {
            return (
              <GridItem key={item.id} w="100%" h="10" cursor={'pointer'}>
                <Flex align="center">
                  <img src={item.image} alt="남성의류 로고" className="w-8 lg:w-9 xl:w-10 mr-2" />
                  <span className="flex-shrink-0 text-sm lg:text-md">{item.title}</span>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
