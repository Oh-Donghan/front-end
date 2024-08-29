import axiosInstance from '../instances';

export const getChargePoint = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axiosInstance.get(`/api/members/points`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching charged Point:', error);
    throw error;
  }
};
