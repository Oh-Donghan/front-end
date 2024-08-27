import axios from 'axios';

export const getAlarms = async ({ pageParam = 0 }) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`/api/members/notification`, {
      params: {
        page: undefined,
        size: undefined,
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
