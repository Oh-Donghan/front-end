import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import { RxChevronRight } from 'react-icons/rx';
import AuctionImages from '../components/detail/AuctionImages';
import AuctionDetails from '../components/detail/AuctionDetails';
import BidList from '../components/detail/BidList';
import QnASection from '../components/detail/QnASection';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAuctionDetailData } from '../axios/auctionDetail/auctionDetail';
import { useEffect } from 'react';

const AuctionDetail = () => {
  const { id: auctionId } = useParams();
  const memberId = localStorage.getItem('memberId');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', auctionId],
    queryFn: () => fetchAuctionDetailData(auctionId),
  });

  console.log('데이터', data);

  // 로컬에 내가본 경매 정보 저장
  useEffect(() => {
    if (data) {
      // 필요한 데이터 추출
      const auctionState = data.auctionState;
      const thumbnailImage = data.imageList.find(image => image.imageType === 'THUMBNAIL');
      const title = data.productName;
      const id = data.id;

      // 로컬 스토리지에 저장
      const recentAuction = {
        auctionState,
        thumbnailUrl: thumbnailImage.imageUrl, // 해당 이미지의 URL을 저장
        title,
        id,
      };

      // 기존 저장된 경매 리스트 불러오기
      const recentAuctions = JSON.parse(localStorage.getItem(memberId)) || [];

      // 새로 본 경매를 리스트에 추가
      const updatedRecentAuctions = [
        recentAuction,
        ...recentAuctions.filter((item: { id: number }) => item.id !== id),
      ].slice(0, 5); // 최대 10개까지만 저장

      localStorage.setItem(memberId, JSON.stringify(updatedRecentAuctions));
    }
  }, [data, memberId]);

  if (isLoading) {
    <div>Data Loading...</div>;
  }

  if (isError) {
    <div>fetch Error...</div>;
  }

  return (
    <Flex
      maxW="1280px"
      direction="column"
      mx="auto"
      px={{ base: '16px', md: '32px' }}
      py="16px"
      w="100%"
    >
      {/* Breadcrumb */}
      <Breadcrumb spacing="8px" separator={<RxChevronRight />}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">전체</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{data?.parentCategory?.categoryName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{data?.childCategory?.categoryName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{data?.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mt="16px" gap="8" direction={{ base: 'column', md: 'row' }}>
        {/* Image Section */}
        <AuctionImages imageList={data?.imageList} />

        {/* Details Section */}
        <AuctionDetails auctionId={auctionId} />
      </Flex>
      <Flex gap="8" direction={{ base: 'column', md: 'row' }}>
        {/* Bids Section */}
        <BidList auctionId={auctionId} />

        {/* Q&A Section */}
        <QnASection qna={data?.askList} sellerId={data?.seller.memberId} />
      </Flex>
    </Flex>
  );
};

export default AuctionDetail;
