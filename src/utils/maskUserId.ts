export default function maskUserId(userId: string) {
  if (userId.length <= 3) {
    return '*'.repeat(userId.length);
  }
  const visiblePart = userId.slice(0, -3);
  const maskedPart = '*'.repeat(3);
  return visiblePart + maskedPart;
}
