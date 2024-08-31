import axiosInstance from '../instance';

export const fetchRechargeData = async (
  page: number,
  itemsPerPage: number,
  sorted: string,
  startDate: Date | null,
  endDate: Date | null,
) => {
  try {
    const response = await axiosInstance.get('api/members/points/history', {
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
