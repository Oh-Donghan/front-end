import axiosInstance from '../instance';

export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get(`/api/chat/rooms`);

    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export const getChatsById = async ({ roomId }) => {
  try {
    const response = await axiosInstance.get(`/api/chat/rooms/${roomId}/messages`, {
      params: {
        roomId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
