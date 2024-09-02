import axiosInstance from '../instance';

export const fetchDeleteAnswerQnA = async (answerId: number) => {
  try {
    const response = await axiosInstance.delete(`api/answers/${answerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
};
