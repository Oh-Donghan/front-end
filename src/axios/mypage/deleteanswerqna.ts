import axiosInstance from '../instance';

export const fetchDeleteAnswerQnA = async () => {
  try {
    const response = await axiosInstance.delete('api/answers');
    return response.data;
  } catch (error) {
    console.error('Error fetching auction details:', error);
    throw error;
  }
};
