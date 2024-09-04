import axiosInstance from '../instance';

// 포인트 내역 항목의 인터페이스 정의
interface IPointHistoryItem {
  id: number;
  pointType: 'CHARGE' | 'GET' | 'USE'; // 포인트 타입 (충전, 수익, 사용)
  pointAmount: number; // 포인트 변경량
  curPointAmount: number; // 현재 포인트 잔액
  memberId: number; // 회원 ID
  createdAt: string; // 생성 일시
}

// 정렬 관련 인터페이스 정의
interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
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
interface IPointHistoryResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: IPointHistoryItem[]; // 포인트 내역 항목 배열
  number: number;
  sort: ISort;
  numberOfElements: number;
  pageable: IPageable;
  empty: boolean;
}

export const fetchRechargeData = async (
  page: number,
  itemsPerPage: number,
  sorted: string,
  startDate: Date | null,
  endDate: Date | null,
): Promise<IPointHistoryResponse> => {
  try {
    const response = await axiosInstance.get<IPointHistoryResponse>('api/members/points/history', {
      params: {
        page: page - 1,
        size: itemsPerPage,
        sorted: sorted || 'latest', // 정렬 기준
        startDate: startDate ? startDate.toISOString().slice(0, 10) : null, // 시작 날짜
        endDate: endDate ? endDate.toISOString().slice(0, 10) : null, // 종료 날짜
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
