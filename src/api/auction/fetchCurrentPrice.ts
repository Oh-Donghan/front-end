import axios from 'axios';

interface fetchCurrentPriceProps {
  currentPrice?: number;
}

export const fetchCurrentPrice = async ({ currentPrice }: fetchCurrentPriceProps) => {
  const res = await axios.get(`https://fake-server.com/api/price-updates`, {
    params: {
      currentPrice,
    },
  });

  return res.data;
};
