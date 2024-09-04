import axiosInstance from '../instance';

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

// 카카오 충전 포인트 선택 api
export const crateChargeOrder = async (price: number) => {
  const token = localStorage.getItem('accessToken');

  const requestBody = {
    price,
  };

  try {
    const response = await axiosInstance.post(
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
    console.error('Error fetching crate Charge Order:', error);
    throw error;
  }
};

// 카카오 충전 유저 인증 api
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
    const response = await axiosInstance.post(
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
    console.error('Error fetching create Payment:', error);
    throw error;
  }
};

// 카카오 포인트 충전 승인 api
export const approvePayment = async ({ partner_order_id, pg_token }) => {
  try {
    const response = await axiosInstance.get('https://dddang.store/api/members/payment/approve', {
      params: {
        partner_order_id,
        pg_token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching approve Payment:', error);
    throw error;
  }
};
