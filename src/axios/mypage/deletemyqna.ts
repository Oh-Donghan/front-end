import axiosInstance from '../instance';

export const fetchDeleteMyQnA = async (askId: number) => {
  try {
    const response = await axiosInstance.delete(`api/asks/${askId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting answer:', error);
    throw error;
  }
};
