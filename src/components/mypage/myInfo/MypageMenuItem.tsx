import { ListItem, ListItemProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useMatch } from 'react-router-dom';

interface MypageMenuItemProps {
  item: {
    icon: ReactNode;
    label: string;
    path: string;
  };
  handleItemClick: (path: string) => void;
  onClose?: () => void; // 선택적 onClose 프롭
}

export default function MypageMenuItem({
  item,
  handleItemClick,
  onClose,
}: MypageMenuItemProps & ListItemProps) {
  const match = useMatch(item.path);

  return (
    <ListItem
      className={`flex items-center gap-2 cursor-pointer hover:scale-105 transition-all ${
        match ? 'font-bold scale-105' : 'font-normal'
      }`}
      onClick={() => {
        handleItemClick(item.path);
        if (onClose) onClose();
      }}
    >
      {item.icon} <span>{item.label}</span>
    </ListItem>
  );
}
