import axiosInstance from '../instance';

export const getAlarms = async ({ page }: { page: number }) => {
  try {
    const response = await axiosInstance.get(`/api/members/notification`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};
