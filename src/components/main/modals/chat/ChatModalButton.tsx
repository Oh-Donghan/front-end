import chat from '../../../../assets/image/modal/chat/chat_907099.png';
import close from '../../../../assets/image/modal/chat/close_359376.png';

export default function ChatButton({ isPopoverOpen }) {
  return (
    <div className="cursor-pointer">
      <img
        src={!isPopoverOpen ? chat : close}
        alt="채팅 아이콘"
        className={`${!isPopoverOpen ? 'w-[58px] h-[58px]' : 'w-[56px] h-[58px]'}`}
        draggable={false}
      />
    </div>
  );
}
