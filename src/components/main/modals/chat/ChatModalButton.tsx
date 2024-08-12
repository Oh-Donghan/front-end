import { useState } from 'react';
import chat from '../../../../assets/image/main/chat.png';
import hot from '../../../../assets/image/main/hot.png';

export default function ChatButton({ isPopoverOpen }) {
  return (
    <div className="cursor-pointer">
      <img src={!isPopoverOpen ? chat : hot} alt="채팅 아이콘" className="w-[53px] h-[53px]" />
    </div>
  );
}
