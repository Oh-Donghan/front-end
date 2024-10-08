import axiosInstance from '../instance';

export const getAlarms = async () => {
  try {
    const response = await axiosInstance.get(`/api/members/notification`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};

// 알람 구독
export const subscribeAlarms = async () => {
  try {
    const response = await axiosInstance.get(`/api/members/notification/subscribe`);
    return response.data;
  } catch (error) {
    console.error('Error subscribe alarms:', error);
    throw error;
  }
};
