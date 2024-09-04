import axiosInstance from '../instance';

export const fetchInstantBuyData = async (auctionId: string) => {
  try {
    const response = await axiosInstance.post(`/api/auctions/${auctionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
