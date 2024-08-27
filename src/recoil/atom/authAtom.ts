import { atom } from 'recoil';

// localStorage에 accessToken이 있는지 확인
const isAuthenticated = !!localStorage.getItem('accessToken');

export const authState = atom({
  key: 'authState',
  default: isAuthenticated,
});
