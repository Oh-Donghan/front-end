// 소분류 카테고리를 인터페이스
interface SubCategory {
  id: number;
  categoryName: string;
  parentId: number;
}

// 대분류 카테고리를 인터페이스
interface Category {
  id: number;
  categoryName: string;
  imgUrl: string;
  categories: SubCategory[];
}

// 전체 카테고리 리스트 타입
export type CategoryList = Category[];
