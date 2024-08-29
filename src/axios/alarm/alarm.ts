import axiosInstance from '../instances';

export const getAlarms = async ({ page }: { page: number }) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axiosInstance.get(`/api/members/notification`, {
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};
