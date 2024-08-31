// src/utils/timeUtils.ts
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 주어진 ISO 날짜 문자열을 현재 시점과 비교하여 상대적인 시간으로 변환합니다.
 * "약" 접두사를 제거한 한국어로 표시됩니다.
 * @param isoDateString ISO 형식의 날짜 문자열 (예: "2024-08-31 03:10")
 * @returns 상대적인 시간 문자열 (예: "3시간 전")
 */
export function formatTimeAgo(isoDateString: string): string {
  return formatDistanceToNow(parseISO(isoDateString), {
    addSuffix: true,
    locale: ko,
  }).replace(/^약 /, ''); // "약"이라는 접두사를 제거합니다.
}
