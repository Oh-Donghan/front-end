import axiosInstance from '../instances';

export const getCategories = async () => {
  const res = await axiosInstance.get(`/api/categories`);

  return res.data;
};
