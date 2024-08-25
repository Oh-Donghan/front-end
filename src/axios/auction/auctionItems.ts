import axios from '../instances';

interface fetchItemsProps {
  word?: string;
  category?: string;
  sorted?: string;
  sub?: string;
}

export const getAuctionItems = async ({ word, category, sorted, sub }: fetchItemsProps) => {
  const res = await axios.get(`/api/auctions`, {
    params: {
      word,
      category: category === '전체' ? undefined : category,
      sorted,
      sub,
    },
  });

  return res.data;
};
