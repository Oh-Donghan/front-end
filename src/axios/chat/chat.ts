import axiosInstance from '../instance';

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get(`/api/rooms`);

    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
