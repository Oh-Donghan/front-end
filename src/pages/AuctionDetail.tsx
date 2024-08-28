import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import { RxChevronRight } from 'react-icons/rx';
import AuctionImages from '../components/detail/AuctionImages';
import AuctionDetails from '../components/detail/AuctionDetails';
import BidList from '../components/detail/BidList';
import QnASection from '../components/detail/QnASection';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAuctionDetailData } from '../axios/auctionDetail/auctionDetail';

const AuctionDetail = () => {
  const { id: auctionId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', auctionId],
    queryFn: () => fetchAuctionDetailData(auctionId),
  });

  console.log(data);

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
          <BreadcrumbLink href="#">{data?.productName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mt="16px" gap="8" direction={{ base: 'column', md: 'row' }}>
        {/* Image Section */}
        <AuctionImages />

        {/* Details Section */}
        <AuctionDetails />
      </Flex>
      <Flex gap="8" direction={{ base: 'column', md: 'row' }}>
        {/* Bids Section */}
        <BidList />

        {/* Q&A Section */}
        <QnASection />
      </Flex>
    </Flex>
  );
};

export default AuctionDetail;
