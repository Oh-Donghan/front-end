interface Seller {
  memberId: string;
  social: string | null;
}

interface Buyer {
  memberId: string;
  social: string | null;
}

interface Auction {
  id: number;
  title: string;
  thumbnail: string;
}

export interface ChatDataType {
  id: number;
  seller: Seller;
  buyer: Buyer;
  auction: Auction;
  unReadCnt: number;
  lastMessage: string;
  lastMessageTime: string;
  createdAt?: string;
}

// export interface ChatDataType {
//   id: number;
//   seller: Seller;
//   buyer: Buyer;
//   auction: Auction;
//   createdAt: string;
// }
