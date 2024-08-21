import chat from '../../../assets/image/modal/chat/chat.png';
import close from '../../../assets/image/modal/chat/close.png';

export default function ChatButton({ isPopoverOpen }) {
  return (
    <div className="cursor-pointer">
      <img
        src={!isPopoverOpen ? chat : close}
        alt="채팅 아이콘"
        className={'w-[46px] h-[46px]'}
        draggable={false}
      />
    </div>
  );
}
