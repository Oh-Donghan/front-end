import axiosInstance from '../../instances';

export const fetchPurchaseHistoryData = async (
  page: number,
  itemsPerPage: number,
  searchWord: string,
  transType: string,
  sorted: string,
) => {
  const response = await axiosInstance.get('/api/transactions/purchases', {
    params: {
      page: page - 1, // 페이지는 0부터 시작
      size: itemsPerPage,
      word: searchWord || '', // 검색어
      transTypeString: transType || '', // 거래 상태
      sorted: sorted || 'recent', // 정렬 기준
    },
  });

  return response.data;
};
