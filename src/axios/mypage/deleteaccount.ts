import axiosInstance from '../instance';

export const fetchDeleteAccount = async (withDrawalReason: string) => {
  console.log('사유:', withDrawalReason);
  try {
    const response = await axiosInstance.post('api/auth/withdrawl', {
      withDrawalReason,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delete account:', error);
    throw error;
  }
};
