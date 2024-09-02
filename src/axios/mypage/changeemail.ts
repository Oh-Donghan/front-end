import axiosInstance from '../instance';

export const fetchChangeEmail = async (email: string, authNum: string) => {
  try {
    const response = await axiosInstance.patch('api/auth/change/email', {
      email,
      authNum,
    });

    // 요청이 성공하면 서버로부터의 응답을 반환
    return response.data;
  } catch (error) {
    console.error('Failed to change email:', error);
    return null;
  }
};
