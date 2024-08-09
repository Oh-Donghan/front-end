import Countdown from 'react-countdown';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-red-500 font-bold">경매가 종료되었습니다.</span>;
  } else {
    return (
      <div className="text-center px-2 py-1 bg-gray-100 rounded-lg shadow-md">
        <span className="text-sm font-semibold">
          {days}
          <span className="text-gray-600">일 </span> {hours} : {minutes} : {seconds}
        </span>
      </div>
    );
  }
};

export default function Timer() {
  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="flex items-center justify-center bg-blue-50">
      <Countdown date={sevenDaysLater} renderer={renderer} />
    </div>
  );
}
