import axiosInstance from '../instances';

interface fetchItemsProps {
  word?: string;
  category?: string;
  sorted?: string;
  sub?: string;
}

export const getAuctionItems = async ({ word, category, sorted, sub }: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions`, {
    params: {
      word,
      mainCategory: category === '전체' ? undefined : category,
      subCategory: sub,
      sorted,
    },
  });

  return res.data;
};

export const getAuctionHotItems = async ({ category, sub }: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions/top5`, {
    params: {
      mainCategory: category === '전체' ? undefined : category,
      subCategory: sub,
    },
  });

  return res.data;
};
