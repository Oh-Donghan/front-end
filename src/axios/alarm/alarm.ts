import axios from 'axios';

export const getAlarms = async ({ pageParam = 0 }) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`/api/members/notifications`, {
      params: {
        page: pageParam,
        size: 10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};
