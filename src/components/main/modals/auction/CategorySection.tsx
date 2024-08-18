import { Flex, Select, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const categories = {
  '1': ['셔츠', '바지', '자켓', '코트', '액세서리'],
  '2': ['드레스', '블라우스', '스커트', '코트', '가방'],
  '3': ['피규어', '레고', '보드게임', '모형', '퍼즐'],
  '4': ['노트북', '스마트폰', 'TV', '카메라', '오디오'],
  '5': ['소설', '자기계발서', '만화책', '전문서적', '전자책'],
  '6': ['기저귀', '아기옷', '유모차', '장난감', '아기침대'],
  '7': ['아이돌 굿즈', '애니메이션 굿즈', '게임 굿즈', '영화 굿즈', '기타 굿즈'],
  '8': ['과자', '음료수', '반찬', '즉석식품', '과일'],
  '9': ['화장품', '헤어케어', '바디케어', '향수', '네일'],
  '10': ['사료', '장난감', '목욕용품', '옷', '훈련용품'],
  '11': ['의자', '책상', '침대', '소파', '수납장'],
  '12': ['운동기구', '운동복', '신발', '야외활동 용품', '스포츠 용품'],
  '13': ['청소도구', '조리도구', '세제', '조명', '소형가전'],
  '14': ['화분', '씨앗', '비료', '정원도구', '인테리어 식물'],
  '15': ['목걸이', '귀걸이', '반지', '팔찌', '시계'],
  '16': ['기타1', '기타2', '기타3', '기타4', '기타5'],
};

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubCategory,
  subCategories,
  setSubCategories,
}) {
  const { register, setValue } = useFormContext();

  const handleCategoryChange = e => {
    const category = e.target.value;
    setSelectedCategory(category);
    const subCategoryOptions = categories[category] || [];
    setSubCategories(subCategoryOptions);
    setValue('parentCategoryId', category);
    setValue('childCategoryId', ''); // 세부 카테고리 초기화
  };

  const handleSubCategoryChange = e => {
    const category = e.target.value;
    setSelectedSubCategory(category);
    setValue('childCategoryId', category); // 세부 카테고리 초기화
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
          borderColor={'rgba(200,200,200,1)'}
          fontSize={'0.95rem'}
          onClick={handleCategoryChange}
          {...register('parentCategoryId')}
        >
          <option value="">카테고리 선택</option>
          <option value="1">남성의류</option>
          <option value="2">여성의류</option>
          <option value="3">키덜트</option>
          <option value="4">가전제품</option>
          <option value="5">도서제품</option>
          <option value="6">유아용품</option>
          <option value="7">굿즈</option>
          <option value="8">식품</option>
          <option value="9">뷰티</option>
          <option value="10">반려동물</option>
          <option value="11">가구</option>
          <option value="12">스포츠</option>
          <option value="13">생활용품</option>
          <option value="14">식물</option>
          <option value="15">악세사리</option>
          <option value="16">기타</option>
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
          borderColor={'rgba(200,200,200,1)'}
          fontSize={'0.95rem'}
          {...register('childCategoryId')}
          onClick={handleSubCategoryChange}
          isDisabled={!selectedCategory}
        >
          <option value="">세부 카테고리 선택</option>
          {subCategories.map((subCategory, index) => (
            <option key={index} value={index + 1}>
              {subCategory}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}
