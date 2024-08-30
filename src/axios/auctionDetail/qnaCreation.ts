import axiosInstance from '../instance';

// Q&A 생성 시 사용할 데이터 타입 정의
export interface IQnAData {
  title: string;
  content: string;
  auctionId: string;
}

export const fetchQnACreation = async (
  title: string,
  content: string,
  auctionId: string,
): Promise<IQnAData> => {
  try {
    const response = await axiosInstance.post<IQnAData>('api/asks', {
      title,
      content,
      auctionId,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Q&A:', error);
    throw error;
  }
};
