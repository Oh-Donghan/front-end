import axiosInstance from '../instance';

export interface ICreateAnswerDto {
  title: string;
  content: string;
  auctionId: number;
  askId: number;
}
// Image 항목의 인터페이스 정의
export interface IAnswerImage {
  answerId: number;
  auctionId: number | null;
  createdAt: string;
  id: number;
  imageName: string;
  imageType: string;
  imageUrl: string;
}

export interface IAnswerResponse {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  imageList: IAnswerImage[];
  createdAt: string;
}

export const fetchCreateAnswer = async (
  createDto: ICreateAnswerDto,
  imageList?: File[],
): Promise<IAnswerResponse> => {
  try {
    const formData = new FormData();

    // 이미지가 있을 경우 FormData에 추가
    if (imageList && imageList.length > 0) {
      imageList.forEach(image => {
        formData.append('imageList', image);
      });
    }

    // JSON 데이터를 FormData에 추가
    formData.append(
      'createDto',
      new Blob([JSON.stringify(createDto)], { type: 'application/json' }),
    );

    // POST 요청 전송
    const response = await axiosInstance.post<IAnswerResponse>('api/answers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
};
