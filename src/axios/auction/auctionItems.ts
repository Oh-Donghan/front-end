import axiosInstance from '../instance';

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

/* 경매 거래 단건 조회 */
export const getTransactions = async (auctionId: number) => {
  const res = await axiosInstance.get(`/api/transactions`, {
    params: {
      auctionId,
    },
  });

  return res.data;
};
