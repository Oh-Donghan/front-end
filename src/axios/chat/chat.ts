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

// 채팅방 입장 후 서버에 채팅방 id값을 넘겨주는 api
export const enterChatRoom = async ({ roomId }) => {
  try {
    const response = await axiosInstance.get(`api/chat/room/${roomId}/enter`, {
      params: {
        roomId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Enter Chat Room Error:', error);
    throw error;
  }
};
