import axiosInstance from '../instance';

// Bid 아이템의 인터페이스 정의
interface IBid {
  id: number;
  bidPrice: number;
  auctionId: number;
  auctionTitle: string;
  thumbnailImageUrl: string;
  memberId: string;
  createdAt: string;
}

// 페이지 관련 인터페이스 정의
interface ISort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 전체 응답 구조의 인터페이스 정의
interface IBidHistoryResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: IBid[]; // Bid 항목 배열
  number: number;
  sort: ISort;
  pageable: IPageable;
  numberOfElements: number;
  empty: boolean;
}

export const fetchBidData = async (): Promise<IBidHistoryResponse> => {
  try {
    const response = await axiosInstance.get<IBidHistoryResponse>('/api/bids');
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
