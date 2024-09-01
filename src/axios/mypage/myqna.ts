import axiosInstance from '../instance';

// Image 항목의 인터페이스 정의
interface IAnswerImage {
  answerId: number;
  auctionId: number | null;
  createdAt: string;
  id: number;
  imageName: string;
  imageType: string;
  imageUrl: string;
}

// Answer 항목의 인터페이스 정의
interface IAnswer {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  imageList: IAnswerImage[];
  createdAt: string;
}

// QnA 항목의 인터페이스 정의
export interface IQnA {
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
interface IMyQnA {
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

export const fetchMyQnAData = async ({ page, size }): Promise<IMyQnA> => {
  try {
    const response = await axiosInstance.get<IMyQnA>('api/asks', {
      params: {
        page,
        size,
      },
    });
    console.log('data::', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
