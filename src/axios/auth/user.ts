import axiosInstance from '../instances';

export const signIn = async (id: string, password: string) => {
  const response = await axiosInstance.post('/api/members/login', {
    id,
    password,
  });

  const { accessToken, refreshToken } = response.data.data;

  // 로그인 성공시 토큰을 localStorage에 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};
