import { useState } from 'react';
import {
  Flex,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  Textarea,
  Button,
  Select,
} from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';

export default function CreateAuctionModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0); // 별점 상태 관리
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 상태 관리
  const [subCategories, setSubCategories] = useState([]); // 세부 카테고리 상태 관리
  const [tradeMethod, setTradeMethod] = useState(''); // 거래 방법 상태 관리
  const [shippingMethod, setShippingMethod] = useState(''); // 택배비 선택 상태 관리

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

  const handleCategoryChange = e => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSubCategories(categories[category] || []);
  };

  const handleTradeMethodChange = e => {
    const method = e.target.value;
    setTradeMethod(method);
    if (method !== '택배') {
      setShippingMethod('');
    }
  };

  const handleShippingMethodChange = e => {
    setShippingMethod(e.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const ratingChanged = newRating => {
    setRating(newRating);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={'950px'}>
        <ModalHeader paddingX={'40px'} paddingTop={'30px'} paddingBottom={'20px'}>
          <Text fontSize={'3xl'}>Logo</Text>
        </ModalHeader>
        <ModalBody paddingX={'40px'} paddingBottom={'20px'}>
          <Flex gap={10}>
            <Flex flex={'1'} direction={'column'}>
              <InputGroup>
                <Flex direction={'column'} width={'full'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      상품명
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                  </Flex>
                  <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                </Flex>
              </InputGroup>
              <Flex marginTop={'30px'} gap={6}>
                <Flex flex={1} direction={'column'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      카테고리
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                  </Flex>
                  <Select
                    borderColor={'rgba(200,200,200,1)'}
                    fontSize={'0.95rem'}
                    onChange={handleCategoryChange}
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
                    isDisabled={!selectedCategory}
                  >
                    <option value="">세부 카테고리 선택</option>
                    {subCategories.map((subCategory, index) => (
                      <option key={index} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Flex>
              <Flex gap={6} marginTop={'30px'}>
                <InputGroup>
                  <Flex direction={'column'} width={'full'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'}>
                        색상
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
                <InputGroup>
                  <Flex direction={'column'} width={'full'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'} color={'rgba(70,70,70,1)'}>
                        택배비
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
              </Flex>
              <Flex gap={6} marginTop={'30px'}>
                <Flex flex={1} direction={'column'}>
                  <Flex alignItems={'center'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      상태
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={30}
                      activeColor="#ffd700"
                      isHalf={true}
                    />
                    <Text
                      fontSize={16}
                      fontWeight={'normal'}
                      marginLeft={2}
                      marginTop={'14px'}
                      color={'rgba(150,150,150,1)'}
                    >
                      ({rating}/5)
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex marginTop={'30px'} gap={6}>
                <Flex flex={1} direction={'column'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      거래 방법
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                  </Flex>
                  <Select
                    borderColor={'rgba(200,200,200,1)'}
                    fontSize={'0.95rem'}
                    onChange={handleTradeMethodChange}
                    value={tradeMethod}
                  >
                    <option value="">거래 방법 선택</option>
                    <option value="직접 만나서">직접 만나서</option>
                    <option value="택배">택배</option>
                  </Select>
                </Flex>
                <Flex flex={1} direction={'column'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      택배비
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                  </Flex>
                  <Select
                    borderColor={'rgba(200,200,200,1)'}
                    fontSize={'0.95rem'}
                    onChange={handleShippingMethodChange}
                    value={shippingMethod}
                    isDisabled={tradeMethod !== '택배'}
                  >
                    <option value="">비용 지불 방법 선택</option>
                    <option value="선불">선불</option>
                    <option value="착불">착불</option>
                  </Select>
                </Flex>
              </Flex>
            </Flex>
            <Flex flex={'1'} direction={'column'}>
              <InputGroup>
                <Flex direction={'column'} width={'full'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      상품설명
                    </Text>
                    <Text fontSize={14} color={'rgba(150,150,150,1)'} marginLeft={1}>
                      (500자 제한)
                    </Text>
                  </Flex>
                  <Textarea
                    borderColor={'rgba(200,200,200,1)'}
                    fontSize={'0.95rem'}
                    maxLength={500}
                    height={'139px'}
                    resize={'none'}
                    sx={{
                      '::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                      },
                      '::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(150, 150, 150, 1)',
                        borderRadius: '10px',
                      },
                      '::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(240, 240, 240, 1)',
                      },
                    }}
                  />
                </Flex>
              </InputGroup>
              <Flex gap={6} marginTop={'30px'}>
                <InputGroup>
                  <Flex direction={'column'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'}>
                        입찰 시작가
                      </Text>
                      <Text fontSize={14} color={'red'} marginLeft={1}>
                        *필수
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
                <InputGroup>
                  <Flex direction={'column'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'}>
                        즉시 구매가
                      </Text>
                      <Text fontSize={14} color={'red'} marginLeft={1}>
                        *필수
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
              </Flex>
              <InputGroup marginTop={'30px'}>
                <Flex direction={'column'} width={'full'}>
                  <Flex alignItems={'center'} marginBottom={'4px'}>
                    <Text fontSize={16} fontWeight={'semibold'}>
                      상품 이미지
                    </Text>
                    <Text fontSize={14} color={'red'} marginLeft={1}>
                      *필수
                    </Text>
                    <Text fontSize={14} color={'rgba(150,150,150,1)'} marginLeft={1}>
                      (최소 1개 최대 6개)
                    </Text>
                  </Flex>
                  <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                </Flex>
              </InputGroup>
              <Flex gap={6} marginTop={'30px'}>
                <InputGroup>
                  <Flex direction={'column'} width={'full'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'}>
                        경매 종료 날짜
                      </Text>
                      <Text fontSize={14} color={'red'} marginLeft={1}>
                        *필수
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
                <InputGroup>
                  <Flex direction={'column'} width={'full'}>
                    <Flex alignItems={'center'} marginBottom={'4px'}>
                      <Text fontSize={16} fontWeight={'semibold'}>
                        직거래 주소
                      </Text>
                      <Text fontSize={14} color={'red'} marginLeft={1}>
                        *필수
                      </Text>
                    </Flex>
                    <Input borderColor={'rgba(200,200,200,1)'} type="text" fontSize={'0.95rem'} />
                  </Flex>
                </InputGroup>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent={'end'} paddingBottom={'40px'}>
          <Button
            variant="ghost"
            border={'1px solid rgba(210,210,210,1)'}
            color={'rgba(120,120,120,1)'}
            onClick={handleClose}
          >
            취소
          </Button>
          <Button colorScheme="blue" mr={3} marginLeft={'12px'}>
            만들기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
