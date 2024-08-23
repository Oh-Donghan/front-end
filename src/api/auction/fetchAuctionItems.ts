import axios from 'axios';

interface fetchItemsProps {
  pageParam?: number;
  type?: string;
}

export const fetchItems = async ({ pageParam = 0, type }: fetchItemsProps) => {
  const res = await axios.get(`https://fake-server.com/api/auctions`, {
    params: {
      page: pageParam,
      type: type,
    },
  });

  return res.data;
};
