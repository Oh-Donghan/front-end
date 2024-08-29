import axiosInstance from '../instances';
import axios from 'axios';

// 현재 포유중인 포인트 가져오기
export const getChargdePoint = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axiosInstance.get(`/api/members/points`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching charged Point:', error);
    throw error;
  }
};

// 포인트 충전하기 1단계
export const crateChargeOrder = async (price: number) => {
  const token = localStorage.getItem('accessToken');

  const requestBody = {
    price,
  };

  try {
    const response = await axios.post(
      'https://dddang.store/api/members/orders/create',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching charged Point (step1):', error);
    throw error;
  }
};

// 포인트 충전하기 2단계
export const createPayment = async ({
  orderId,
  memberId,
  price,
}: {
  orderId: number;
  memberId: number;
  price: number;
}) => {
  const token = localStorage.getItem('accessToken');

  const requestBody = {
    orderId,
    memberId,
    price,
  };

  try {
    const response = await axios.post(
      'https://dddang.store/api/members/payment/ready',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching charged Point (step1):', error);
    throw error;
  }
};
