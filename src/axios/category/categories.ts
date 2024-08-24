import axiosInstance from '../instances';

interface fetchCategoriesProps {
  categoryName?: string;
}

export const getCategories = async ({ categoryName }: fetchCategoriesProps) => {
  const res = await axiosInstance.get(`/api/categories`, {
    params: {
      categoryName,
    },
  });

  return res.data;
};
