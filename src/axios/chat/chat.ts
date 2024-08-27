import axiosInstance from '../instances';

export const getChats = async () => {
  const token = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('memberId');

  try {
    const response = await axiosInstance.get(`/api/rooms`, {
      params: {
        memberId: memberId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};
