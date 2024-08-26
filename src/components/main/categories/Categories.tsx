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
import computer from '../../../assets/image/category/computer.png';

import { IoChevronDownSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../../axios/category/categories';

export default function Categories() {
  const [selectedOption, setSelectedOption] = useState({
    title: '카테고리를 선택해 주세요',
    image: null,
  });

  const categorySkeletonArray = new Array(16).fill(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const navigate = useNavigate();

  const handleSelect = item => {
    setSelectedOption(prev => ({ ...prev, title: item.title, image: computer }));
    navigate(`/auctions?category=${item.categoryName}`);
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  if (isLoading) {
    return (
      <>
        <div className="flex sm:hidden mt-4  relative z-50 justify-center">
          <Menu isLazy matchWidth>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDownSharp />}
              bg={'white'}
              border={'1px'}
              borderColor="gray.400"
              width={'88%'}
              justifyContent="flex-start"
              textAlign="left"
              color={'rgba(180,180,180,1)'}
            >
              {'카테고리를 선택해 주세요'}
            </MenuButton>
          </Menu>
        </div>
        {/* 가로 너비 sm 이상일 때 카테고리 */}
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
            gap={{ base: '6', md: '8', lg: '10' }}
          >
            {categorySkeletonArray.map((_, i) => {
              return (
                <Flex align={'center'} key={i}>
                  <Box
                    borderRadius={'50%'}
                    w={'40px'}
                    h={'40px'}
                    bgColor={'rgba(230,230,230,1)'}
                  ></Box>
                  <Box w={'44px'} h={'12px'} bgColor={'rgba(230,230,230,1)'} ml={3}></Box>
                </Flex>
              );
            })}
          </Grid>
        </Box>
      </>
    );
  }

  return (
    <>
      <div className="flex sm:hidden mt-4  relative z-50 justify-center">
        <Menu isLazy matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<IoChevronDownSharp />}
            bg={'white'}
            border={'1px'}
            borderColor="gray.400"
            width={'88%'}
            justifyContent="flex-start"
            textAlign="left"
          >
            <Flex align="start">
              {selectedOption.image && (
                <Image
                  src={selectedOption.image}
                  alt="category image"
                  boxSize="1.3rem"
                  mr="9px"
                  marginLeft={'-6px'}
                />
              )}
              <Text color={'rgba(150,150,150,1)'} fontWeight={'normal'}>
                {selectedOption.title}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList maxH="220px" overflowY="auto" width={'100%'}>
            {categories.map(category => (
              <MenuItem
                key={category.id}
                value={category.title}
                onClick={() => {
                  handleSelect(category);
                }}
              >
                <Flex align="center">
                  <Image
                    src={category.imgUrl}
                    alt={category.categoryName}
                    boxSize="1.3rem"
                    mr="9px"
                    marginLeft={'-2px'}
                  />
                  <Text>{category.categoryName}</Text>
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
      {/* 가로 너비 sm 이상일 때 카테고리 */}
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
          gap={{ base: '6', md: '8', lg: '10' }}
        >
          {categories.map(item => {
            return (
              <Link to={`/auctions?category=${item.categoryName}`} key={item.id}>
                <GridItem w="100%" h="10" cursor={'pointer'}>
                  <Flex align="center">
                    <img
                      src={item.imgUrl}
                      alt={item.categoryName}
                      className="w-8 lg:w-9 xl:w-10 mr-2"
                    />
                    <span className="flex-shrink-0 text-sm lg:text-md">{item.categoryName}</span>
                  </Flex>
                </GridItem>
              </Link>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
