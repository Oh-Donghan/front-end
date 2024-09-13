import axiosInstance from '../instance';

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

export const signOut = async () => {
  try {
    const response = await axiosInstance.post('/api/auth/logout', {});

    // 로그아웃이 성공하면 SSE 구독 해제

    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

// 일반 회원가입 api
export const signUp = async ({
  email,
  id,
  password,
  confirmPassword,
  authNum,
}: {
  email: string;
  id: string;
  password: string;
  confirmPassword: string;
  authNum: string;
}) => {
  const requestBody = {
    email,
    memberId: id,
    password,
    confirmPassword,
    authNum,
  };

  const response = await axiosInstance.post('/api/auth/signup', requestBody);

  return response.data;
};

// 아이디 중복 확인 api
export const idDuplicateCheck = async ({ id }: { id: string }) => {
  const requestBody = {
    memberId: id,
  };

  const response = await axiosInstance.post('/api/auth/check/id', requestBody);

  return response.data;
};

// 이메일 인증 코드 발송 api
export const RequestAuthenticationEmailCode = async ({ email }: { email: string }) => {
  const requestBody = {
    email,
  };

  const response = await axiosInstance.post('/api/mail/send', requestBody);

  return response.data;
};

// 이메일 인증 코드 발송 api (회원가입)
export const confirmEmail = async ({ email, authNum }: { email: string; authNum: string }) => {
  const requestBody = {
    email,
    authNum,
  };

  const response = await axiosInstance.post('/api/mail/check', requestBody);

  return response.data;
};

// 일반 로그인 api
export const logIn = async ({ id, password }: { id: string; password: string }) => {
  const requestBody = {
    memberId: id,
    password,
  };

  const response = await axiosInstance.post('api/auth/login', requestBody, {
    withCredentials: true,
  });

  const { accessToken, memberId } = response.data;

  // 로그인 성공시 토큰을 localStorage에 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('memberId', memberId);

  return response.data;
};

// 아이디 중복 확인 api
export const FindId = async ({ email }: { email: string }) => {
  const requestBody = {
    email,
  };

  const response = await axiosInstance.post('api/auth/find/id', requestBody);

  return response.data;
};

// 아이디 중복 확인 api
export const FindPassword = async ({ memberId, email }: { memberId: string; email: string }) => {
  const requestBody = {
    memberId,
    email,
  };

  const response = await axiosInstance.post('api/auth/find/password', requestBody);

  return response.data;
};
