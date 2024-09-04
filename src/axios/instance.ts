import axios from 'axios';

// Axios 인스턴스 생성 - VITE_BASE_URL을 기반으로 모든 요청이 이 URL을 사용
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://dddang.store',
});

// 요청 인터셉터 - 요청이 서버로 보내지기 전에 실행
axiosInstance.interceptors.request.use(
  config => {
    // 로컬 스토리지에서 accessToken을 가져와 Authorization 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
      config.withCredentials = true; // 쿠키를 포함한 자격 증명을 요청에 포함
    }
    return config; // 수정된 config를 반환하여 요청에 반영
  },
  error => {
    return Promise.reject(error); // 요청 중 오류 발생 시, 오류를 그대로 반환
  },
);

// 응답 인터셉터 - 서버로부터 응답을 받은 후 실행
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response headers:', response.headers); // 서버 응답의 헤더를 로그에 출력
    const newToken = response.headers['new-token']; // 응답 헤더에서 새로운 토큰을 확인
    if (newToken) {
      console.log('New Token (success):', newToken); // 새로운 토큰이 있으면 로그에 출력
      localStorage.setItem('accessToken', newToken); // 새로운 토큰을 로컬 스토리지에 저장
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; // Axios의 기본 헤더에 새로운 토큰 설정
    }
    return response; // 응답 데이터를 그대로 반환
  },
  error => {
    console.log('Error response headers:', error.response ? error.response.headers : 'No response'); // 오류 발생 시 응답 헤더를 로그에 출력
    const newToken = error.response ? error.response.headers['new-token'] : null; // 오류 응답 헤더에서도 새로운 토큰을 확인
    if (newToken) {
      console.log('New Token (error):', newToken); // 새로운 토큰이 있으면 로그에 출력
      localStorage.setItem('accessToken', newToken); // 새로운 토큰을 로컬 스토리지에 저장
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; // Axios의 기본 헤더에 새로운 토큰 설정
    }
    if (error.response && error.response.status === 401) {
      console.error('Authorization failed, token expired or invalid'); // 401 오류 발생 시 콘솔에 오류 메시지 출력
    }
    return Promise.reject(error); // 오류를 그대로 반환하여 호출한 코드에서 처리할 수 있게 함
  },
);

export default axiosInstance; // Axios 인스턴스를 기본 내보내기로 설정
