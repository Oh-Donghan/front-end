import axiosInstance from '../../instances';

export const fetchSellHistoryData = async () => {
  const response = await axiosInstance.get('/api/transactions/sales');
  return response.data.content;
};
