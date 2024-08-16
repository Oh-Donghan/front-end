import axios from 'axios';

export const fetchSellHistoryData = async () => {
  const response = await axios.get('/api/transactions/sales');
  return response.data.content;
};
