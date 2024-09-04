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
  Spinner,
  Image,
} from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import CategorySection from './CategorySection';
import ImageSection from './ImageSection';
import RatingSection from './RatingSection';
import SelectDateSection from './SelectDateSection';
import { createAuction } from '../../../../axios/auction/auction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateAuctionType } from '../../../../interface/auction/actionInterface';
import { formatDateToCustomString } from '../../../../utils/dateFormat';
import logo from '../../../../assets/logo/logo-final.png';

export default function CreateAuctionModal({ isOpen, onClose }) {
  const methods = useForm();
  const { register, handleSubmit, reset } = methods;
  const [rating, setRating] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
  const [subCategories, setSubCategories] = useState([]);
  const [tradeMethod, setTradeMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [files, setFiles] = useState([]);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [contactPlace, setContactPlace] = useState('');
  const [startPrice, setStartPrice] = useState<number>(0);
  const [instantPrice, setInstantPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<string>(''); // 택배비 상태 추가
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleClose = () => {
    reset({
      title: '',
      productName: '',
      color: '',
      shippingCost: '',
      description: '',
      tradeMethod: '',
      shippingMethod: '',
    });
    setTradeMethod('');
    setShippingMethod('');
    setSelectedCategory(0);
    setSelectedSubCategory(0);
    setSubCategories([]);
    setFiles([]);
    setEndDate(null);
    setContactPlace('');
    setRating(0);
    setStartPrice(0);
    setInstantPrice(0);
    setShippingCost(''); // 택배비 초기화
    onClose();
  };

  const handleTradeMethodChange = e => {
    const method = e.target.value;
    setTradeMethod(method);

    if (method === 'contact') {
      // 대면 거래 선택 시, 택배비와 배송 방법 초기화
      setShippingMethod('nodelivery');
      setShippingCost('');
    }

    if (method === 'delivery') {
      // 택배 거래 선택 시, 직거래 주소 초기화
      setContactPlace('');
    }

    if (method === 'all') {
      // 모두 가능 거래 선택 시, 택배비 지불 방법 초기화
      setShippingMethod('');
      setContactPlace('');
    }
  };

  const handleShippingMethodChange = e => {
    const method = e.target.value;
    setShippingMethod(method);
  };

  const createAuctionMutation = useMutation({
    mutationFn: ({
      createDto,
      thumbnail,
      imageList,
    }: {
      createDto: CreateAuctionType;
      thumbnail: File;
      imageList: File[];
    }) => createAuction(createDto, thumbnail, imageList),
    onSuccess: data => {
      console.log(data);
      toast({
        title: '경매 만들기 성공',
        status: 'success',
        duration: 1300,
      });

      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'items',
      });

      handleClose();
    },
    onError: error => {
      console.error('Error submitting form:', error);
      toast({
        title: `경매 만들기 실패`,
        status: 'error',
        duration: 1300,
      });
    },
  });

  const onSubmit = async data => {
    if (
      !data.title ||
      !data.productName ||
      !selectedCategory ||
      !selectedSubCategory ||
      !startPrice ||
      !instantPrice ||
      !endDate ||
      !tradeMethod ||
      !shippingMethod ||
      rating === 0 ||
      files.length === 0 ||
      ((tradeMethod === 'contact' || tradeMethod === 'all') && contactPlace === '') || // 직거래 방법 선택 시 주소 필수
      ((tradeMethod === 'delivery' || tradeMethod === 'all') && !shippingCost) // 택배 방법 선택 시 택배비 필수
    ) {
      toast({
        title: '모든 필수 입력란을 채워주세요',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    if (startPrice >= instantPrice) {
      toast({
        title: '입찰 시작가 보다 즉시 구매가가 더 높아야 합니다.',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    if (files.length > 6) {
      toast({
        title: '이미지는 최대 6개까지만 입력 가능합니다.',
        status: 'error',
        duration: 1300,
      });
      return;
    }

    const createDto = {
      title: data.title,
      receiveType: tradeMethod,
      deliveryType: shippingMethod,
      startPrice: startPrice,
      instantPrice: instantPrice,
      endedAt: formatDateToCustomString(endDate),
      parentCategoryId: selectedCategory,
      childCategoryId: selectedSubCategory,
      productName: data.productName,
      productStatus: rating,
      productColor: data.color || '',
      productDescription: data.description || '',
      deliveryPrice: shippingMethod !== 'nodelivery' ? parseInt(shippingCost) : undefined,
      contactPlace: tradeMethod === 'contact' || tradeMethod === 'all' ? contactPlace : undefined,
    };

    const thumbnail = files[0];
    const imageList = files.slice(1);

    createAuctionMutation.mutate({ createDto, thumbnail, imageList });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={'950px'} minWidth={'808px'}>
        <ModalHeader paddingX={'40px'} paddingTop={'30px'} paddingBottom={'20px'}>
          <Text fontSize={'3xl'}>
            <Image src={logo} alt="로고 이미지" h="75px" />
          </Text>
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
                          <Text fontSize={12} color={'red'} marginLeft={1}>
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
                          <Text fontSize={12} color={'red'} marginLeft={1}>
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
                  <CategorySection
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    subCategories={subCategories}
                    setSubCategories={setSubCategories}
                  />
                  <Flex gap={6} marginTop={'30px'} position={'relative'} zIndex={999}>
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
                        <Flex alignItems={'center'} marginBottom={'4px'}></Flex>
                        <SelectDateSection endDate={endDate} setEndDate={setEndDate} />
                      </Flex>
                    </InputGroup>
                  </Flex>
                  <Flex marginTop={'30px'}>
                    <RatingSection rating={rating} onRatingChange={setRating} />
                  </Flex>
                  <Flex gap={6} marginTop={'30px'} position={'relative'} zIndex={1}>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            입찰 시작가
                          </Text>
                          <Text fontSize={12} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          type={'number'}
                          borderColor={'rgba(200,200,200,1)'}
                          fontSize={'0.95rem'}
                          onChange={e => {
                            setStartPrice(Number(e.target.value));
                          }}
                        />
                      </Flex>
                    </InputGroup>
                    <InputGroup>
                      <Flex direction={'column'} width={'full'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            즉시 구매가
                          </Text>
                          <Text fontSize={12} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Input
                          type={'number'}
                          borderColor={'rgba(200,200,200,1)'}
                          fontSize={'0.95rem'}
                          onChange={e => {
                            setInstantPrice(Number(e.target.value));
                          }}
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
                        <Text fontSize={12} color={'rgba(150,150,150,1)'} marginLeft={1}>
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
                          '::-webkit-scrollbarThumb': {
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            borderRadius: '10px',
                          },
                          '::-webkit-scrollbarTrack': {
                            backgroundColor: 'rgba(240, 240, 240, 1)',
                          },
                        }}
                      />
                    </Flex>
                  </InputGroup>
                  <Flex gap={6} marginTop={'30px'}>
                    <Flex flex={1} direction={'column'}>
                      <Flex alignItems={'center'} marginBottom={'4px'}>
                        <Text fontSize={16} fontWeight={'semibold'}>
                          거래 방법
                        </Text>
                        <Text fontSize={12} color={'red'} marginLeft={1}>
                          *필수
                        </Text>
                      </Flex>
                      <Select
                        borderColor={'rgba(200,200,200,1)'}
                        fontSize={'0.95rem'}
                        onChange={handleTradeMethodChange}
                        value={tradeMethod}
                        placeholder="거래 방법 선택"
                      >
                        <option value="contact">대면 거래</option>
                        <option value="delivery">택배</option>
                        <option value="all">모두 가능</option>
                      </Select>
                    </Flex>

                    <Flex flex={1} direction={'column'}>
                      <Flex alignItems={'center'} marginBottom={'4px'}>
                        <Text fontSize={16} fontWeight={'semibold'}>
                          직거래 주소
                        </Text>
                        <Text fontSize={12} color={'red'} marginLeft={1}>
                          *직거래 시 필수
                        </Text>
                      </Flex>
                      <Input
                        borderColor={'rgba(100,100,100,1)'}
                        type="text"
                        fontSize={'0.95rem'}
                        value={contactPlace}
                        onChange={e => setContactPlace(e.target.value)}
                        isDisabled={tradeMethod === '' || tradeMethod === 'delivery'}
                        _disabled={{ borderColor: 'rgba(200,200,200,1)' }}
                      />
                    </Flex>
                  </Flex>
                  <Flex gap={6} marginTop={'30px'}>
                    <InputGroup>
                      <Flex flex={1} direction={'column'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            택배비
                          </Text>
                          <Text fontSize={12} color={'red'} marginLeft={1}>
                            *택배 거래 시 필수
                          </Text>
                        </Flex>
                        <Input
                          type={'number'}
                          borderColor={'rgba(100,100,100,1)'}
                          fontSize={'0.95rem'}
                          value={shippingCost}
                          onChange={e => setShippingCost(e.target.value)}
                          isDisabled={tradeMethod === '' || tradeMethod === 'contact'}
                          _disabled={{ borderColor: 'rgba(200,200,200,1)' }}
                        />
                      </Flex>
                    </InputGroup>

                    <InputGroup>
                      <Flex flex={1} direction={'column'}>
                        <Flex alignItems={'center'} marginBottom={'4px'}>
                          <Text fontSize={16} fontWeight={'semibold'}>
                            택배비 지불 방법
                          </Text>
                          <Text fontSize={12} color={'red'} marginLeft={1}>
                            *필수
                          </Text>
                        </Flex>
                        <Select
                          borderColor={'rgba(100,100,100,1)'}
                          fontSize={'0.95rem'}
                          onChange={handleShippingMethodChange}
                          value={shippingMethod}
                          isDisabled={
                            tradeMethod === '' || tradeMethod === 'contact' ? true : false
                          }
                          placeholder={
                            tradeMethod === 'contact' ? '택배 불가능' : '비용 지불 방법 선택'
                          }
                          _disabled={{ borderColor: 'rgba(200,200,200,1)' }}
                        >
                          <option value="prepay">선불</option>
                          <option value="noprepay">착불</option>
                          {tradeMethod !== 'delivery' && (
                            <option value="nodelivery">택배 불가능</option>
                          )}
                        </Select>
                      </Flex>
                    </InputGroup>
                  </Flex>
                  <Flex marginTop={'30px'}>
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
                <Button
                  colorScheme="blue"
                  marginLeft={'12px'}
                  type="submit"
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  w={'80px'}
                  disabled={createAuctionMutation.isPending}
                >
                  {createAuctionMutation.isPending ? <Spinner size={'sm'} /> : <Text>만들기</Text>}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
