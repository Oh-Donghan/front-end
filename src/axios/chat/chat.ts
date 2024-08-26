import axiosInstance from '../instances';

export const getChat = async () => {
  const res = await axiosInstance.get(`/api/rooms`);

  return res.data;
};
