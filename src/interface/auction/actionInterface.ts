{
  /* 경매 만들기 할 때 createDto 타입 */
}
export interface CreateAuctionType {
  title: string;
  receiveType: string;
  deliveryType: string;
  startPrice: number;
  instantPrice: number;
  endedAt: string;
  parentCategoryId: number;
  childCategoryId: number;
  productName: string;
  productStatus: number;
  contactPlace?: string;
  productColor?: string;
  productDescription?: string;
  deliveryPrice?: number;
}
