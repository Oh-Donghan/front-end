import { atom } from 'recoil';

// soket 통신으로 받아오는 auction정보 배열 형태로 저장
export const auctionState = atom({
  key: 'auctionState',
  default: [],
});
