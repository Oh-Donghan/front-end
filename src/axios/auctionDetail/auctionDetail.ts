import axiosInstance from '../instances';

interface Seller {
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

interface Category {
  id: number;
  categoryName: string;
  parentId: number | null;
  createdAt: string;
}

interface Image {
  id: number;
  imageUrl: string;
  imageName: string;
  imageType: string;
  answerId: number | null;
  auctionId: number;
  createdAt: string;
}

interface AuctionItem {
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
  seller: Seller;
  parentCategory: Category;
  childCategory: Category;
  bidList: Array<unknown>; // Define a specific type if you know the structure of bids
  askList: Array<unknown>; // Define a specific type if you know the structure of asks
  imageList: Image[];
  createdAt: string;
}

export const fetchAuctionDetailData = async (auctionId: string): Promise<AuctionItem> => {
  try {
    // 경매 세부 정보를 가져오기 위한 API 호출
    const response = await axiosInstance.get<AuctionItem>(`/api/auctions/${auctionId}`);

    // API 호출 성공 시 데이터 반환
    return response.data;
  } catch (error) {
    // 오류 처리 (필요에 따라 로깅 또는 사용자 친화적인 메시지를 제공)
    console.error('Error fetching auction details:', error);

    // 오류를 다시 throw해서 호출한 측에서 처리할 수 있게 합니다.
    throw error;
  }
};
