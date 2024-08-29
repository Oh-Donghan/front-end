// Sort 인터페이스
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// Pageable 인터페이스
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// AlarmResponseType 인터페이스
export interface AlarmResponseType {
  id: number;
  memberId: number;
  auctionId: number;
  content: string;
  notificationType: string;
  createdAt: string;
}

// ApiResponse 인터페이스
export interface ApiResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[]; // Generic 타입을 사용하여 다양한 데이터 타입을 허용
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
