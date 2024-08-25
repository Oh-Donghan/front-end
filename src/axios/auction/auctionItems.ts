import axiosInstance from '../instances';

interface fetchItemsProps {
  word?: string;
  category?: string;
  sorted?: 'date' | 'view' | 'low' | 'high';
  sub?: string;
}

export const getAuctionItems = async ({ word, category, sorted, sub }: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions`, {
    params: {
      word,
      category,
      sorted,
      sub,
    },
  });

  return res.data;
};
