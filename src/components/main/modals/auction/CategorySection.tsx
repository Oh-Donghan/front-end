import { Flex, Select, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { CategoryList } from '../../../../interface/category/categoryInterface';

const categories = [
  {
    id: 1,
    categoryName: '남성의류',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/men.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9tZW4ucG5nIiwiaWF0IjoxNzI0MzkwMzkzLCJleHAiOjE3NTU5MjYzOTN9.jPYC5-4TA9BWAbrsoKifpa29iOy3N4lGG5a2UKpTAkI&t=2024-08-23T05%3A19%3A53.068Z',
    categories: [
      {
        id: 17,
        categoryName: '셔츠',
        parentId: 1,
      },
      {
        id: 18,
        categoryName: '바지',
        parentId: 1,
      },
      {
        id: 19,
        categoryName: '자켓',
        parentId: 1,
      },
      {
        id: 20,
        categoryName: '코트',
        parentId: 1,
      },
      {
        id: 21,
        categoryName: '액세서리',
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    categoryName: '여성의류',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/women.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy93b21lbi5wbmciLCJpYXQiOjE3MjQzOTA1NDQsImV4cCI6MTc1NTkyNjU0NH0.l2P-KmvvHMGRbS4QKdEcWCNRQrqpZpexNyvWmELg-As&t=2024-08-23T05%3A22%3A24.347Z',
    categories: [
      {
        id: 22,
        categoryName: '드레스',
        parentId: 2,
      },
      {
        id: 23,
        categoryName: '블라우스',
        parentId: 2,
      },
      {
        id: 24,
        categoryName: '스커트',
        parentId: 2,
      },
      {
        id: 25,
        categoryName: '코트',
        parentId: 2,
      },
      {
        id: 26,
        categoryName: '가방',
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    categoryName: '키덜트',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/kidult.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9raWR1bHQucG5nIiwiaWF0IjoxNzI0MzkwNTU5LCJleHAiOjE3NTU5MjY1NTl9.7_0gRAVQkNC22mtOGMhs8rHvaf3MFOluEZNmNHQb0XE&t=2024-08-23T05%3A22%3A39.074Z',
    categories: [
      {
        id: 27,
        categoryName: '피규어',
        parentId: 3,
      },
      {
        id: 28,
        categoryName: '레고',
        parentId: 3,
      },
      {
        id: 29,
        categoryName: '보드게임',
        parentId: 3,
      },
      {
        id: 30,
        categoryName: '모형',
        parentId: 3,
      },
      {
        id: 31,
        categoryName: '퍼즐',
        parentId: 3,
      },
    ],
  },
  {
    id: 4,
    categoryName: '가전제품',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/electronics.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9lbGVjdHJvbmljcy5wbmciLCJpYXQiOjE3MjQzOTA1NzQsImV4cCI6MTc1NTkyNjU3NH0.wmMj-yPa-8t97didnbgXqIqx3vwWwo9cq59vyNWh3rw&t=2024-08-23T05%3A22%3A54.427Z',
    categories: [
      {
        id: 32,
        categoryName: '노트북',
        parentId: 4,
      },
      {
        id: 33,
        categoryName: '스마트폰',
        parentId: 4,
      },
      {
        id: 34,
        categoryName: 'TV',
        parentId: 4,
      },
      {
        id: 35,
        categoryName: '카메라',
        parentId: 4,
      },
      {
        id: 36,
        categoryName: '오디오',
        parentId: 4,
      },
    ],
  },
  {
    id: 5,
    categoryName: '도서제품',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/books.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9ib29rcy5wbmciLCJpYXQiOjE3MjQzOTA2MDAsImV4cCI6MTc1NTkyNjYwMH0.CbE5COK77HAnYhvgbK0S24oc6UfafGIRO78jpdN677Y&t=2024-08-23T05%3A23%3A20.634Z',
    categories: [
      {
        id: 37,
        categoryName: '소설',
        parentId: 5,
      },
      {
        id: 38,
        categoryName: '자기계발서',
        parentId: 5,
      },
      {
        id: 39,
        categoryName: '만화책',
        parentId: 5,
      },
      {
        id: 40,
        categoryName: '전문서적',
        parentId: 5,
      },
      {
        id: 41,
        categoryName: '전자책',
        parentId: 5,
      },
    ],
  },
  {
    id: 6,
    categoryName: '유아용품',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/baby.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9iYWJ5LnBuZyIsImlhdCI6MTcyNDM5MDYxNCwiZXhwIjoxNzU1OTI2NjE0fQ.PG6oLLuB7c4gldxoXCeNKtRcmnULQyP-0Y_S5ywjwyg&t=2024-08-23T05%3A23%3A34.159Z',
    categories: [
      {
        id: 42,
        categoryName: '기저귀',
        parentId: 6,
      },
      {
        id: 43,
        categoryName: '아기옷',
        parentId: 6,
      },
      {
        id: 44,
        categoryName: '유모차',
        parentId: 6,
      },
      {
        id: 45,
        categoryName: '장난감',
        parentId: 6,
      },
      {
        id: 46,
        categoryName: '아기침대',
        parentId: 6,
      },
    ],
  },
  {
    id: 7,
    categoryName: '굿즈',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/goods.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9nb29kcy5wbmciLCJpYXQiOjE3MjQzOTA2MjgsImV4cCI6MTc1NTkyNjYyOH0.BlRg6PMKxlzLuYrmMKTibC9PTekfWSEaaTBmJy6M_io&t=2024-08-23T05%3A23%3A48.312Z',
    categories: [
      {
        id: 47,
        categoryName: '아이돌 굿즈',
        parentId: 7,
      },
      {
        id: 48,
        categoryName: '애니메이션 굿즈',
        parentId: 7,
      },
      {
        id: 49,
        categoryName: '게임 굿즈',
        parentId: 7,
      },
      {
        id: 50,
        categoryName: '영화 굿즈',
        parentId: 7,
      },
      {
        id: 51,
        categoryName: '기타 굿즈',
        parentId: 7,
      },
    ],
  },
  {
    id: 8,
    categoryName: '식품',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/food.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9mb29kLnBuZyIsImlhdCI6MTcyNDM5MDY0OSwiZXhwIjoxNzU1OTI2NjQ5fQ.GuAnjuByraOCc69dGD8s_1Wf8dE9QMA7UjUNLanuDUI&t=2024-08-23T05%3A24%3A09.659Z',
    categories: [
      {
        id: 52,
        categoryName: '과자',
        parentId: 8,
      },
      {
        id: 53,
        categoryName: '음료수',
        parentId: 8,
      },
      {
        id: 54,
        categoryName: '반찬',
        parentId: 8,
      },
      {
        id: 55,
        categoryName: '즉석식품',
        parentId: 8,
      },
      {
        id: 56,
        categoryName: '과일',
        parentId: 8,
      },
    ],
  },
  {
    id: 9,
    categoryName: '뷰티',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/beauty.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9iZWF1dHkucG5nIiwiaWF0IjoxNzI0MzkwNjYxLCJleHAiOjE3NTU5MjY2NjF9.G6-KEpxVOrlHutoHMiAJh4que8tR6pMXtbQBwlH2loM&t=2024-08-23T05%3A24%3A21.958Z',
    categories: [
      {
        id: 57,
        categoryName: '화장품',
        parentId: 9,
      },
      {
        id: 58,
        categoryName: '헤어케어',
        parentId: 9,
      },
      {
        id: 59,
        categoryName: '바디케어',
        parentId: 9,
      },
      {
        id: 60,
        categoryName: '향수',
        parentId: 9,
      },
      {
        id: 61,
        categoryName: '네일',
        parentId: 9,
      },
    ],
  },
  {
    id: 10,
    categoryName: '반려동물',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/pet.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9wZXQucG5nIiwiaWF0IjoxNzI0NDAwOTI3LCJleHAiOjE3NTU5MzY5Mjd9.7IIHFc12vDctP_za338chAQlOUEj3MnpgzYElgkCZyI&t=2024-08-23T08%3A15%3A26.984Z',
    categories: [
      {
        id: 62,
        categoryName: '사료',
        parentId: 10,
      },
      {
        id: 63,
        categoryName: '장난감',
        parentId: 10,
      },
      {
        id: 64,
        categoryName: '목욕용품',
        parentId: 10,
      },
      {
        id: 65,
        categoryName: '옷',
        parentId: 10,
      },
      {
        id: 66,
        categoryName: '훈련용품',
        parentId: 10,
      },
    ],
  },
  {
    id: 11,
    categoryName: '가구',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/furniture.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9mdXJuaXR1cmUucG5nIiwiaWF0IjoxNzI0MzkwNzUwLCJleHAiOjE3NTU5MjY3NTB9.K47QXlbP4OI2N8Few7PZGeC5UwXYdyHMYLdSGq6I0S8&t=2024-08-23T05%3A25%3A50.446Z',
    categories: [
      {
        id: 67,
        categoryName: '의자',
        parentId: 11,
      },
      {
        id: 68,
        categoryName: '책상',
        parentId: 11,
      },
      {
        id: 69,
        categoryName: '침대',
        parentId: 11,
      },
      {
        id: 70,
        categoryName: '소파',
        parentId: 11,
      },
      {
        id: 71,
        categoryName: '수납장',
        parentId: 11,
      },
    ],
  },
  {
    id: 12,
    categoryName: '스포츠',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/sports.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9zcG9ydHMucG5nIiwiaWF0IjoxNzI0MzkwNzYxLCJleHAiOjE3NTU5MjY3NjF9.WiXA3kGRamJyBlQ0yepPOpp4yqkN4xP92wFPdN-E0d8&t=2024-08-23T05%3A26%3A01.500Z',
    categories: [
      {
        id: 72,
        categoryName: '운동기구',
        parentId: 12,
      },
      {
        id: 73,
        categoryName: '운동복',
        parentId: 12,
      },
      {
        id: 74,
        categoryName: '신발',
        parentId: 12,
      },
      {
        id: 75,
        categoryName: '야외활동 용품',
        parentId: 12,
      },
      {
        id: 76,
        categoryName: '스포츠 용품',
        parentId: 12,
      },
    ],
  },
  {
    id: 13,
    categoryName: '생활용품',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/daily.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9kYWlseS5wbmciLCJpYXQiOjE3MjQzOTA3NzYsImV4cCI6MTc1NTkyNjc3Nn0.M3FYKjGBAxwVMbQHot_bVDEBRsLrmKocoAueZb3vaUQ&t=2024-08-23T05%3A26%3A16.683Z',
    categories: [
      {
        id: 77,
        categoryName: '청소도구',
        parentId: 13,
      },
      {
        id: 78,
        categoryName: '조리도구',
        parentId: 13,
      },
      {
        id: 79,
        categoryName: '세제',
        parentId: 13,
      },
      {
        id: 80,
        categoryName: '조명',
        parentId: 13,
      },
      {
        id: 81,
        categoryName: '소형가전',
        parentId: 13,
      },
    ],
  },
  {
    id: 14,
    categoryName: '식물',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/plant.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9wbGFudC5wbmciLCJpYXQiOjE3MjQzOTA3ODUsImV4cCI6MTc1NTkyNjc4NX0.Vzlxs32HDnoJcTOzrf-i7ihSZto4ykJ8s_CUzn2TiXE&t=2024-08-23T05%3A26%3A25.590Z',
    categories: [
      {
        id: 82,
        categoryName: '화분',
        parentId: 14,
      },
      {
        id: 83,
        categoryName: '씨앗',
        parentId: 14,
      },
      {
        id: 84,
        categoryName: '비료',
        parentId: 14,
      },
      {
        id: 85,
        categoryName: '정원도구',
        parentId: 14,
      },
      {
        id: 86,
        categoryName: '인테리어 식물',
        parentId: 14,
      },
    ],
  },
  {
    id: 15,
    categoryName: '악세사리',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/accessory.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9hY2Nlc3NvcnkucG5nIiwiaWF0IjoxNzI0MzkwODI1LCJleHAiOjE3NTU5MjY4MjV9.K7LCXJKkBCwVXyfRhMxlHlhZQ0CY0VwWDvjDW8Rf4pI&t=2024-08-23T05%3A27%3A06.728Z',
    categories: [
      {
        id: 87,
        categoryName: '목걸이',
        parentId: 15,
      },
      {
        id: 88,
        categoryName: '귀걸이',
        parentId: 15,
      },
      {
        id: 89,
        categoryName: '반지',
        parentId: 15,
      },
      {
        id: 90,
        categoryName: '팔찌',
        parentId: 15,
      },
      {
        id: 91,
        categoryName: '시계',
        parentId: 15,
      },
    ],
  },
  {
    id: 16,
    categoryName: '기타',
    imgUrl:
      'https://dipwebufeocjtwzmmcjt.supabase.co/storage/v1/object/sign/tribe%20item%20images/etc.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmliZSBpdGVtIGltYWdlcy9ldGMucG5nIiwiaWF0IjoxNzI0MzkwODQwLCJleHAiOjE3NTU5MjY4NDB9.Pf_2YY8RGXXxK8aufzJCLhtZwUM8ce1eF4thaU4knIA&t=2024-08-23T05%3A27%3A20.469Z',
    categories: [
      {
        id: 92,
        categoryName: '기타1',
        parentId: 16,
      },
      {
        id: 93,
        categoryName: '기타2',
        parentId: 16,
      },
      {
        id: 94,
        categoryName: '기타3',
        parentId: 16,
      },
      {
        id: 95,
        categoryName: '기타4',
        parentId: 16,
      },
      {
        id: 96,
        categoryName: '기타5',
        parentId: 16,
      },
    ],
  },
];

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubCategory,
  subCategories,
  setSubCategories,
}) {
  // const queryClient = useQueryClient();
  // const categories: CategoryList | undefined = queryClient.getQueryData(['categories']);

  const handleCategoryChange = e => {
    const category = e.target.value;
    const subCategoryOptions =
      categories.find(cat => cat.id === parseInt(category))?.categories || [];
    setSelectedCategory(parseInt(category));
    setSubCategories(subCategoryOptions);
  };

  const handleSubCategoryChange = e => {
    const subCategory = e.target.value;
    setSelectedSubCategory(parseInt(subCategory));
  };

  return (
    <Flex marginTop={'30px'} gap={6}>
      <Flex flex={1} direction={'column'}>
        <Flex alignItems={'center'} marginBottom={'4px'}>
          <Text fontSize={16} fontWeight={'semibold'}>
            대분류 카테고리
          </Text>
          <Text fontSize={14} color={'red'} marginLeft={1}>
            *필수
          </Text>
        </Flex>
        <Select
          placeholder="카테고리 선택"
          borderColor={'rgba(200,200,200,1)'}
          fontSize={'0.95rem'}
          onChange={handleCategoryChange}
        >
          {categories.map(cat => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex flex={1} direction={'column'}>
        <Flex alignItems={'center'} marginBottom={'4px'}>
          <Text fontSize={16} fontWeight={'semibold'}>
            세부 카테고리
          </Text>
          <Text fontSize={14} color={'red'} marginLeft={1}>
            *필수
          </Text>
        </Flex>
        <Select
          placeholder="세부 카테고리 선택"
          borderColor={'rgba(200,200,200,1)'}
          fontSize={'0.95rem'}
          onChange={handleSubCategoryChange}
          isDisabled={!selectedCategory}
        >
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.categoryName}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}
