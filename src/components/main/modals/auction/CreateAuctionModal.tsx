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
  useToast,
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import CategorySection from './CategorySection';
import ImageSection from './ImageSection';
import RatingSection from './RatingSection';
import SelectDateSection from './SelectDateSection';
import axios from 'axios';

export default function CreateAuctionModal({ isOpen, onClose }) {
  const methods = useForm();
  const { register, handleSubmit, reset, setValue } = methods;
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [tradeMethod, setTradeMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [files, setFiles] = useState([]);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [contactPlace, setContactPlace] = useState('');
  const toast = useToast();

  function formatDateToDatetime(date) {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleClose = () => {
    reset({
      title: '',
      productName: '',
      category: '',
      subCategory: '',
      color: '',
      shippingCost: '',
      startPrice: '',
      instantPrice: '',
      description: '',
      tradeMethod: '',
      shippingMethod: '',
    });
    setTradeMethod('');
    setShippingMethod('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSubCategories([]);
    setFiles([]);
    setEndDate(null);
    setContactPlace('');
    onClose();
  };

  const handleTradeMethodChange = e => {
    const method = e.target.value;
    setTradeMethod(method);
    setValue('tradeMethod', method);
    if (method !== '택배') {
      setShippingMethod('');
      setValue('shippingMethod', '');
    }
  };

  const handleShippingMethodChange = e => {
    const method = e.target.value;
    setShippingMethod(method);
    setValue('shippingMethod', method);
  };

  const onSubmit = async data => {
    if (
      !data.title ||
      !data.productName ||
      !selectedCategory || // Parent category PK
      !selectedSubCategory || // Child category PK
      !data.startPrice ||
      !data.instantPrice ||
      !endDate ||
      !tradeMethod ||
      (tradeMethod === '택배' && !shippingMethod) ||
      rating === 0 ||
      files.length === 0
    ) {
      toast({
        title: '모든 필수 입력란을 채워주세요',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('transactionType', tradeMethod);
    formData.append('deliveryType', shippingMethod || 'nodelivery');
    if (tradeMethod === '직접 만나서' || tradeMethod === '모두 가능') {
      formData.append('contactPlace', contactPlace);
    }
    formData.append('startPrice', data.startPrice);
    formData.append('instantPrice', data.instantPrice);
    formData.append('endedAt', formatDateToDatetime(endDate));
    formData.append('parentCategoryId', selectedCategory);
    formData.append('childCategoryId', selectedSubCategory);
    formData.append('productName', data.productName);
    formData.append('productStatus', rating.toString());
    formData.append('productColor', data.color || '');
    formData.append('productDescription', data.description || '');
    if (shippingMethod !== 'nodelivery') {
      formData.append('deliveryPrice', data.shippingCost || '');
    }

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      // axios POST 요청
      await axios.post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 성공 시 알림 표시
      toast({
        title: '경매 만들기 성공',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Reset form and state
      reset({
        title: '',
        productName: '',
        category: '',
        subCategory: '',
        color: '',
        shippingCost: '',
        startPrice: '',
        instantPrice: '',
        description: '',
        tradeMethod: '',
        shippingMethod: '',
      });
      setTradeMethod('');
      setShippingMethod('');
      setSelectedCategory('');
      setSelectedSubCategory('');
      setSubCategories([]);
      setFiles([]);
      setEndDate(null);
      setContactPlace('');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: '경매 만들기 실패 (api 아직 없음)',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={'950px'} minWidth={'808px'}>
        <ModalHeader paddingX={'40px'} paddingTop={'30px'} paddingBottom={'20px'}>
          <Text fontSize={'3xl'}>Logo</Text>
        </ModalHeader>
        <ModalBody paddingX={'40px'} paddingBottom={'20px'}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex gap={10}>
                <Flex flex={'1'} direction={'column'}>
                  <Flex gap={6}>
                    <InputGroup flex={'1'}>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            경매명
                          </Text>
                          <Text fontSize={14} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('title')}
                        />
                      </Flex>
                    </InputGroup>
                    <InputGroup flex={'1'}>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            상품명
                          </Text>
                          <Text fontSize={14} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('productName')}
                        />
                      </Flex>
                    </InputGroup>
                  </Flex>
                  {/* 카테고리 선택 섹션 */}
                  <CategorySection
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    subCategories={subCategories}
                    setSubCategories={setSubCategories}
                  />
                  <Flex gap={6} marginTop={'30px'}>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            색상
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('color')}
                        />
                      </Flex>
                    </InputGroup>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'} color={'rgba(70,70,70,1)'}>
                            택배비
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('shippingCost')}
                        />
                      </Flex>
                    </InputGroup>
                  </Flex>
                  {/* Rating 섹션 */}
                  <Flex marginTop={'30px'}>
                    <RatingSection rating={rating} onRatingChange={setRating} />
                  </Flex>
                  <Flex gap={6} marginTop={'30px'}>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            입찰 시작가
                          </Text>
                          <Text fontSize={14} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('startPrice')}
                        />
                      </Flex>
                    </InputGroup>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            즉시 구매가
                          </Text>
                          <Text fontSize={14} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          {...register('instantPrice')}
                        />
                      </Flex>
                    </InputGroup>
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
                        {...register('description')}
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
                    {/* 경매 종료 날짜 섹션 */}
                    <SelectDateSection endDate={endDate} setEndDate={setEndDate} />
                    <InputGroup flex={1}>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            직거래 주소
                          </Text>
                        </Flex>
                        <Input
                          borderColor={'rgba(200,200,200,1)'}
                          type="text"
                          fontSize={'0.95rem'}
                          value={contactPlace}
                          onChange={e => setContactPlace(e.target.value)}
                        />
                      </Flex>
                    </InputGroup>
                  </Flex>
                  <Flex gap={6} marginTop={'30px'}>
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
                          택배비 지불 방법
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
                  <Flex marginTop={'30px'}>
                    {/* 이미지 첨부 섹션 */}
                    <ImageSection files={files} setFiles={setFiles} />
                  </Flex>
                </Flex>
              </Flex>
              <ModalFooter justifyContent={'end'} paddingBottom={'30px'} paddingRight={'0px'}>
                <Button
                  variant="ghost"
                  border={'1px solid rgba(210,210,210,1)'}
                  color={'rgba(120,120,120,1)'}
                  onClick={handleClose}
                >
                  취소
                </Button>
                <Button colorScheme="blue" marginLeft={'12px'} type="submit">
                  만들기
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
