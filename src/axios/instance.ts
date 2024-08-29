import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// axiosInstance.interceptors.response.use(
//   response => {
//     // 서버로부터 응답을 받았을 때 실행되는 코드
//     const newToken = response.headers['new-token'];
//     if (newToken) {
//       localStorage.setItem('accessToken', newToken);
//     }
//     return response;
//   },
//   error => {
//     // 응답에 오류가 있는 경우 실행되는 코드
//     if (error.response.status === 401) {
//       // 토큰 만료 또는 인증 실패 처리
//       // 로그아웃 처리 또는 토큰 갱신 로직을 추가할 수 있습니다.
//       console.log('Token expired or invalid. Please login again.');
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
