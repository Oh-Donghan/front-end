import axiosInstance from '../instance';

export const fetchCurrentPoint = async () => {
  try {
    const response = await axiosInstance.get('api/members/points');
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
