import axiosInstance from '../instance';

interface IDetailSeller {
  id: number;
  memberId: string;
  passWord: string;
  email: string;
  siteAlarm: boolean;
  point: number;
  social: string;
  socialProviderId: string;
  createdAt: string;
}

interface IDetailCategory {
  id: number;
  categoryName: string;
  parentId: number | null;
  createdAt: string;
}

export interface IDetailImage {
  id: number;
  imageUrl: string;
  imageName: string;
  imageType: string;
  answerId: number | null;
  auctionId: number;
  createdAt: string;
}

export interface IAskList {
  answerList: [];
  auctionId: number;
  auctionTitle: string;
  content: string;
  createdAt: string;
  id: number;
  title: string;
  writerId: string;
}

// Bid 항목의 인터페이스 정의
interface IBidItem {
  id: number; // 입찰 항목의 고유 ID
  auctionId: number; // 경매의 고유 ID
  auctionTitle: string; // 경매의 제목
  bidPrice: number; // 입찰 가격
  createdAt: string; // 입찰 생성 일시
  memberId: string; // 입찰자의 고유 ID
  thumbnailImageUrl: string; // 경매의 썸네일 이미지 URL
}

interface IAuctionItem {
  id: number;
  title: string;
  auctionState: string | null;
  productName: string;
  productColor: string;
  productStatus: number;
  productDescription: string;
  receiveType: string;
  contactPlace: string;
  deliveryType: string;
  deliveryPrice: string;
  currentPrice: number;
  startPrice: number;
  instantPrice: number;
  memberCount: number;
  endedAt: string;
  seller: IDetailSeller;
  parentCategory: IDetailCategory;
  childCategory: IDetailCategory;
  bidList: IBidItem[]; // Define a specific type if you know the structure of bids
  askList: IAskList[]; // Define a specific type if you know the structure of asks
  imageList: IDetailImage[];
  createdAt: string;
}

export const fetchAuctionDetailData = async (auctionId: string): Promise<IAuctionItem> => {
  try {
    // 경매 세부 정보를 가져오기 위한 API 호출
    const response = await axiosInstance.get<IAuctionItem>(`/api/auctions/${auctionId}`);

    // API 호출 성공 시 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 처리 (필요에 따라 로깅 또는 사용자 친화적인 메시지를 제공)
    console.error('Error fetching auction details:', error);

    // 오류를 다시 throw해서 호출한 측에서 처리할 수 있게 합니다.
    throw error;
  }
};
