import axios from 'axios';
import { CreateAuctionType } from '../../interface/auction/actionInterface';
import axiosInstance from '../instances';

export const createAuction = async (
  createDto: CreateAuctionType,
  thumbnail: File,
  imageList: File[],
) => {
  const token = localStorage.getItem('accessToken');
  const formData = new FormData();

  // 썸네일 추가
  formData.append('thumbnail', thumbnail);

  // 이미지 리스트 추가
  imageList.forEach(image => {
    formData.append('imageList', image);
  });

  // CreateAuctionDto를 JSON 문자열로 변환하여 추가

  const json = JSON.stringify(createDto);
  const blob = new Blob([json], { type: 'application/json' });

  formData.append('createDto', blob);

  try {
    const res = await axios.post('https://dddang.store/api/auctions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러 처리
      if (error.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        console.error('Error response:', error.response.data);
        throw new Error(
          error.response.data.message || 'An error occurred while creating the auction',
        );
      } else if (error.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우
        throw new Error('No response received from server');
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error('Error setting up the request');
      }
    } else {
      // 일반적인 에러 처리
      throw new Error('An unexpected error occurred');
    }
  }
};
