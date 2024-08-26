import axiosInstance from '../instances';

export const getAlarms = async ({ pageParam = 0 }) => {
  const response = await axiosInstance.get(`/api/members/notifications`, {
    params: {
      page: pageParam,
      size: 10,
    },
  });

  return response.data;
};
