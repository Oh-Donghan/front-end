import axiosInstance from '../../instances';

export const fetchRechargeHistoryData = async (
  page: number,
  itemsPerPage: number,
  sorted: string,
  startDate: Date | null,
  endDate: Date | null,
) => {
  const response = await axiosInstance.get('api/members/points/history', {
    params: {
      page: page - 1,
      size: itemsPerPage,
      sorted: sorted || 'recent', // 정렬 기준
      startDate: startDate ? startDate.toISOString().slice(0, 10) : null, // 시작 날짜
      endDate: endDate ? endDate.toISOString().slice(0, 10) : null, // 종료 날짜
    },
  });

  return response.data;
};
