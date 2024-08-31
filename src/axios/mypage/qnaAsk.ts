import axiosInstance from '../instance';

// Answer 항목의 인터페이스 정의
interface IAnswer {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  imageList: string[];
  createdAt: string;
}

// QnA 항목의 인터페이스 정의
interface IQnA {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  answerList: IAnswer[];
  createdAt: string;
}

// 정렬 관련 인터페이스 정의
interface ISort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// 페이지 관련 인터페이스 정의
interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 전체 응답 구조의 인터페이스 정의
interface IQnAResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: IQnA[]; // QnA 항목 배열
  number: number;
  sort: ISort;
  pageable: IPageable;
  numberOfElements: number;
  empty: boolean;
}

export const fetchQnAAskData = async (): Promise<IQnAResponse> => {
  try {
    const response = await axiosInstance.get<IQnAResponse>('api/asks');
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
