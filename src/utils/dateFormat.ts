import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // 요일 배열
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 포맷: yyyy-MM-dd (요일)
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // 요일 추가
  const weekDay = `(${weekDays[date.getDay()]})`;

  // 시간 포맷: HH:mm:ss
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return `${formattedDate} ${weekDay} ${formattedTime}`;
};

export const formatDateToKorean = (dateString: string): string => {
  // 주어진 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 날짜 옵션
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // 'numeric'으로 설정
    month: 'long', // 'long'으로 설정하면 "8월" 형식으로 출력됩니다.
    day: 'numeric', // 'numeric'으로 설정
    hour: '2-digit', // '2-digit'으로 설정
    minute: '2-digit', // '2-digit'으로 설정
    second: '2-digit', // '2-digit'으로 설정
    hour12: true, // 12시간제로 설정 (오전/오후 포함)
  };

  // 로케일을 'ko-KR'로 설정하여 한글로 출력
  return date.toLocaleDateString('ko-KR', options);
};

// 날짜 정보를 받아서 시간이 얼마나 지났는지 반환
export const timeAgo = dateString => {
  const now = dayjs();
  const date = dayjs(dateString);
  const diffInSeconds = now.diff(date, 'second');

  if (diffInSeconds < 60) {
    return '방금 전'; // 60초 이내면 "방금 전"으로 표시
  }

  return date.fromNow(); // 60초 이상이면 기본 상대 시간 표시
};

// ex) date값을 받아서 year-month-day hours:minutes 형태도 formatting
export const formatDateToCustomString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
