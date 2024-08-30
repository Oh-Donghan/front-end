import axiosInstance from '../../instance';

export enum ITransTypeSell {
  CONTINUE = 'continue',
  SUCCESS = 'end',
  ALL = '', // 전체 조회 시 빈 값 사용
}

export const fetchSellHistoryData = async (
  page: number,
  itemsPerPage: number,
  searchWord: string,
  transType: ITransTypeSell = ITransTypeSell.ALL,
  sorted: string,
  startDate: Date | null,
  endDate: Date | null,
) => {
  const response = await axiosInstance.get('/api/transactions/sales', {
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
