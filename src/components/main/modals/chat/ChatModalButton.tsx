import chat from '../../../../assets/image/modal/chat/chat_907099.png';
import close from '../../../../assets/image/modal/chat/close_359376.png';

export default function ChatButton({ isPopoverOpen }) {
  return (
    <div className="cursor-pointer">
      <img
        src={!isPopoverOpen ? chat : close}
        alt="채팅 아이콘"
        className={'w-[55px] h-[55px]'}
        draggable={false}
      />
    </div>
  );
}
