export const formatPrice = (price?: number) => {
  if (price === undefined || price === null) {
    return '0'; // 기본값을 0으로 반환하거나, 적절한 대체 텍스트 반환
  }
  return price.toLocaleString();
};
