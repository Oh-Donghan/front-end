import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'https://fake-server.com',
});

axiosInstance.interceptors.request.use(
  config => {
    // 개발 환경일 때는 토큰 검사 생략
    if (import.meta.env.MODE !== 'development') {
      // 로컬에서 토큰 불러오기
      const token = localStorage.getItem('accessToken');

      // 인증이 필요한 요청에만 헤더에 토큰을 추가
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
