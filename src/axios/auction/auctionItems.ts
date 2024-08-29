import axiosInstance from '../instances';

interface fetchItemsProps {
  word?: string;
  category?: string;
  sorted?: string;
  subCategory?: string;
  page?: number;
}

export const getAuctionItems = async ({
  word,
  category,
  sorted,
  subCategory,
  page = 0,
}: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions`, {
    params: {
      word,
      mainCategory: category === '전체' ? undefined : category,
      subCategory,
      sorted,
      page,
    },
  });

  return res.data;
};

export const getAuctionHotItems = async ({ category, subCategory }: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions/top5`, {
    params: {
      mainCategory: category === '전체' ? undefined : category,
      subCategory,
    },
  });

  return res.data;
};
