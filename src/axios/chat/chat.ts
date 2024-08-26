import axiosInstance from '../instances';

interface memberId {
  memberId: number;
}

export const getChat = async ({ memberId }) => {
  const response = await axiosInstance.get(`/api/rooms`, {
    params: {
      memberId,
    },
  });

  console.log(response.data);

  return response.data;
};
