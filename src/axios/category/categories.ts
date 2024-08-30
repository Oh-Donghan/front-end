import axiosInstance from '../instance';

export const getCategories = async () => {
  const res = await axiosInstance.get(`/api/categories`);

  return res.data;
};
