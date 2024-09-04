import axiosInstance from '../instance';

// 요청 바디 인터페이스
export interface IUpdateQuestionDto {
  content: string;
}

// 응답 인터페이스
export interface IQuestionResponse {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  answerList: IAnswer[];
  createdAt: string | null;
}

export interface IAnswer {
  id: number;
  auctionId: number;
  auctionTitle: string;
  title: string;
  content: string;
  writerId: string;
  createdAt: string;
}

// 수정 API 호출 함수
export const fetchMyQnAFix = async (
  askId: number,
  updateDto: IUpdateQuestionDto,
): Promise<IQuestionResponse> => {
  try {
    const response = await axiosInstance.put<IQuestionResponse>(`api/asks/${askId}`, updateDto);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};
