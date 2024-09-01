import axiosInstance from '../instance';

// updateDto의 인터페이스 정의
export interface IUpdateAnswerDto {
  content: string;
  imageFileNameList: string[];
}

// fetchUpdateAnswer 함수 정의
export const fetchUpdateAnswer = async (
  answerId: number,
  updateDto: IUpdateAnswerDto,
  imageList: File[],
) => {
  try {
    const formData = new FormData();
    formData.append(
      'updateDto',
      new Blob([JSON.stringify(updateDto)], { type: 'application/json' }),
    );

    imageList.forEach(file => {
      formData.append('imageList', file);
    });

    await axiosInstance.post(`api/answers/${answerId}`, formData);
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};
