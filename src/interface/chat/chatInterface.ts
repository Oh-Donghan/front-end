interface Seller {
  id: number;
  member_id: string;
  email: string;
  social: string;
  social_provider_id: string;
}

interface Buyer {
  id: number;
  member_id: string;
  email: string;
  social: string;
  social_provider_id: string;
}

interface Category {
  category_name: string;
}

interface Auction {
  id: number;
  title: string;
  auction_status: string;
  product_name: string;
  product_color: string;
  product_status: string;
  product_description: string;
  contact: boolean;
  delivery: boolean;
  delivery_type: string;
  delivery_price: number;
  start_price: number;
  instance_price: number;
  ended_at: string;
  created_at: string;
}

interface AuctionData {
  id: number;
  seller: Seller[];
  buyer: Buyer[];
  category: Category[];
  auction: Auction[];
}

export interface ChatResponseType {
  status: number;
  message: string;
  data: AuctionData[];
}
