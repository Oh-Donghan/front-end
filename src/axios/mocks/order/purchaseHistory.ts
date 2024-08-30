import axiosInstance from '../../../axios/instance';

export enum ITransType {
  CONTINUE = 'continue',
  SUCCESS = 'end',
  ALL = '', // 전체 조회 시 빈 값 사용
}

export const fetchPurchaseHistoryData = async (
  page: number,
  itemsPerPage: number,
  searchWord: string,
  transType: ITransType = ITransType.ALL,
  sorted: string,
  startDate: Date | null,
  endDate: Date | null,
) => {
  const response = await axiosInstance.get('/api/transactions/purchases', {
    params: {
      page: page - 1, // 페이지는 0부터 시작
      size: itemsPerPage,
      word: searchWord || '', // 검색어
      transTypeString: transType, // 거래 상태
      sorted: sorted || 'recent', // 정렬 기준
      startDate: startDate ? startDate.toISOString().slice(0, 10) : null, // 시작 날짜
      endDate: endDate ? endDate.toISOString().slice(0, 10) : null, // 종료 날짜
    },
  });

  return response.data;
};
