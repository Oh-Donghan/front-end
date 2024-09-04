import axiosInstance from '../instance';

export const fetchSendEmailAuth = async (email: string) => {
  try {
    const response = await axiosInstance.post('api/mail/send', {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send email auth:', error);
    return null;
  }
};
