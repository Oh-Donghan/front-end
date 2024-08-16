import axios from 'axios';

export const fetchPurchaseHistoryData = async () => {
  const response = await axios.get('/api/transactions/purchases');
  return response.data.content;
};
