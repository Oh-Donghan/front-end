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
