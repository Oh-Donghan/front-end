import axiosInstance from '../instances';

interface fetchItemsProps {
  pageParam?: number;
  type?: string;
}

export const getAuctionItems = async ({ pageParam = 0, type }: fetchItemsProps) => {
  const res = await axiosInstance.get(`/api/auctions`, {
    params: {
      page: pageParam,
      type: type,
    },
  });

  return res.data;
};
