import axiosInstance from '../instance';

interface IChangePassword {
  curPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const fetchChangePassword = async ({
  curPassword,
  newPassword,
  confirmPassword,
}: IChangePassword) => {
  try {
    const response = await axiosInstance.patch('api/auth/change/password', {
      curPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching change password:', error);
    throw error;
  }
};
