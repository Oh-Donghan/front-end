import { Flex, List, ListItem, Spacer, useDisclosure } from '@chakra-ui/react';
import { FaGear, FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { SiLightning } from 'react-icons/si';
import { IoAlertCircle } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ChangePassword from '../components/mypage/modal/ChangePassword';
import DeleteAccount from '../components/mypage/modal/DeleteAccount';

export default function AuctionMyPage() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const changePassword = useDisclosure();
  const deleteAccount = useDisclosure();
  const initialRef = useRef(null);

  const menuItems = [
    { icon: <FaUser />, label: '내 정보', path: '/mypage/myinfo' },
    { icon: <FaShoppingCart />, label: '구매 내역', path: '/mypage/buy' },
    { icon: <RiDiscountPercentFill />, label: '판매 내역', path: '/mypage/sell' },
    { icon: <SiLightning />, label: '충전 내역', path: '/mypage/charge' },
  ];

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  const renderListItems = (items: { icon: JSX.Element; label: string; path: string }[]) =>
    items.map(item => (
      <ListItem
        key={item.path}
        className={`flex items-center gap-2 cursor-pointer ${
          selectedItem === item.path ? 'font-bold' : 'font-normal'
        }`}
        onClick={() => handleItemClick(item.path)}
      >
        {item.icon} <span>{item.label}</span>
      </ListItem>
    ));

  return (
    <>
      <ChangePassword
        onClose={changePassword.onClose}
        isOpen={changePassword.isOpen}
        initialRef={initialRef}
      />
      <DeleteAccount
        onClose={deleteAccount.onClose}
        isOpen={deleteAccount.isOpen}
        initialRef={initialRef}
      />
      <Flex className="max-w-screen-xl mx-auto h-h-screen-minus-nav">
        <Flex
          width={'220px'}
          direction={'column'}
          className="p-6 border border-r-black text-base flex-shrink-0"
        >
          <List spacing={3}>{renderListItems(menuItems)}</List>
          <Spacer />
          <List spacing={3} className="py-4">
            <ListItem className="flex items-center gap-2 cursor-pointer">
              <FaGear /> <div onClick={changePassword.onOpen}>비밀번호 변경</div>
            </ListItem>
            <ListItem className="flex items-center gap-2 cursor-pointer">
              <IoAlertCircle /> <div onClick={deleteAccount.onOpen}>회원탈퇴</div>
            </ListItem>
          </List>
        </Flex>
        <Outlet />
      </Flex>
    </>
  );
}
