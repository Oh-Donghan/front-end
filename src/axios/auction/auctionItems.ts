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
      category,
      sorted: sorted || 'recent',
      sub,
    },
  });

  return res.data;
};
