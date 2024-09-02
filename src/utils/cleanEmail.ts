export function cleanEmail(socialEmail: string) {
  // 값이 존재하는지 확인
  if (!socialEmail) {
    return ''; // 값이 없으면 빈 문자열 반환
  }

  // 정규 표현식을 사용하여 이메일 뒤에 붙은 소셜 플랫폼 식별자를 제거
  return socialEmail.replace(/@(.*?)(kakao|google|naver)$/, '@$1');
}
