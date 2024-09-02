import axiosInstance from '../instance';

export const fetchPinNumber = async (email: string, authNum: string) => {
  try {
    const response = await axiosInstance.post('api/mail/check', {
      email,
      authNum,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send pin auth:', error);
    return null;
  }
};
