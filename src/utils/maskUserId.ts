export default function maskUserId(userId: string | undefined): string {
  if (!userId || userId.length === 0) {
    return 'Unknown User'; // 또는 다른 적절한 기본값을 반환
  }

  // 마스킹할 길이 설정
  const visibleLength = 5;
  const maskedPart = '*'.repeat(visibleLength);

  // 마지막 visibleLength 개를 마스킹하고 앞부분은 그대로 유지
  return userId.slice(0, userId.length - visibleLength) + maskedPart;
}
