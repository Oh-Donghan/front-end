import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const formatDate = dateString => {
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
  return dayjs(dateString).fromNow();
};
