import axiosInstance from '../instance';

// updateDto의 인터페이스 정의
export interface IUpdateAnswerDto {
  content: string;
  imageFileNameList?: string[]; // 이미지 파일 목록이 선택적인 경우
}

// fetchUpdateAnswer 함수 정의
export const fetchUpdateAnswer = async (
  answerId: number,
  updateDto: IUpdateAnswerDto,
  imageList?: File[],
) => {
  try {
    const formData = new FormData();

    // updateDto JSON 객체를 formData에 추가
    formData.append(
      'updateDto',
      new Blob([JSON.stringify(updateDto)], { type: 'application/json' }),
    );

    // imageList가 제공되면 formData에 파일들을 추가
    if (imageList && imageList.length > 0) {
      imageList.forEach(file => {
        formData.append('imageList', file);
      });
    }

    // API 호출
    const response = await axiosInstance.post(`api/answers/${answerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Error updating answer:', error);
    throw error;
  }
};
