import Countdown from 'react-countdown';

interface TimerProps {
  endedAt?: string;
  setIsFinished?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({ endedAt, setIsFinished }: TimerProps) {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setIsFinished(true);
      return <span className="text-red-500 font-bold">경매가 종료되었습니다.</span>;
    } else {
      return (
        <div className="text-center px-2 py-1 bg-gray-100 rounded-lg shadow-md">
          <span className="text-sm font-semibold">
            {days === 0 ? null : (
              <>
                <span>{days}</span> <span className="text-gray-600">일 </span>
              </>
            )}
            <span className="text-gray-600">{String(hours).padStart(2, '0')}시간 </span>{' '}
            {String(minutes).padStart(2, '0')}
            <span className="text-gray-600">분 </span> {String(seconds).padStart(2, '0')}{' '}
            <span className="text-gray-600">초 </span>
          </span>
        </div>
      );
    }
  };

  const endDate = endedAt ? new Date(endedAt) : new Date();

  return (
    <div className="flex items-center justify-center bg-blue-50">
      <Countdown date={endDate} renderer={renderer} />
    </div>
  );
}
