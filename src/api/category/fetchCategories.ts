import axios from 'axios';

interface fetchCategoriesProps {
  categoryName?: string;
}

export const fetchCategories = async ({ categoryName }: fetchCategoriesProps) => {
  const res = await axios.get(`https://fake-server.com/api/categories`, {
    params: {
      categoryName,
    },
  });

  return res.data;
};
