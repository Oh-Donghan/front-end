export interface AuctionItem {
  id: number;
  title: string;
  productName: string;
  productStatus: number;
  receiveType: string;
  deliveryType: string;
  currentPrice: number;
  instantPrice: number;
  memberCount: number;
  endedAt: string;
  childCategory: {
    id: number;
    categoryName: string;
    parentId: number;
    createdAt: string;
  };
  imageList: Array<{
    id: number;
    imageUrl: string;
    imageName: string;
    imageType: string;
    auctionId: number;
    createdAt: string;
  }>;
}

export interface ItemCardProps {
  rank?: number;
  item?: AuctionItem;
  type?: string;
  isLoading?: boolean;
  auctionArray?: Array<{
    bidStatus: string;
    auctionId: number;
    memberId: string;
    bidAmount: number;
  }>;
}
