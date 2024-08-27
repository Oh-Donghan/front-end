import axiosInstance from '../instances';

export const getAlarms = async ({ pageParam = 0 }) => {
  const token = localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/api/members/notifications`, {
    params: {
      page: pageParam,
      size: 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
