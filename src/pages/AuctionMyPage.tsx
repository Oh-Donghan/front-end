import { Flex, List, ListItem, Spacer } from '@chakra-ui/react';
import { FaGear, FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { SiLightning } from 'react-icons/si';
import { IoAlertCircle } from 'react-icons/io5';
import MyInfo from '../components/mypage/myInfo/MyInfo';

export default function AuctionMyPage() {
  return (
    <Flex className="max-w-screen-xl mx-auto h-h-screen-minus-nav">
      <Flex
        width={'250px'}
        direction={'column'}
        className="p-6 bg-slate-100 border border-r-black text-lg flex-shrink-0"
      >
        <List spacing={3}>
          <ListItem className="flex items-center gap-2">
            <FaUser /> <span>내 정보</span>
          </ListItem>
          <ListItem className="flex items-center gap-2">
            <FaShoppingCart /> <span>구매 내역</span>
          </ListItem>
          <ListItem className="flex items-center gap-2">
            <RiDiscountPercentFill /> <span>판매 내역</span>
          </ListItem>
          <ListItem className="flex items-center gap-2">
            <SiLightning /> <span>충전 내역</span>
          </ListItem>
        </List>
        <Spacer />
        <List spacing={3} className="py-4">
          <ListItem className="flex items-center gap-2">
            <FaGear /> <span>비밀번호 변경</span>
          </ListItem>
          <ListItem className="flex items-center gap-2">
            <IoAlertCircle /> <span>회원탈퇴</span>
          </ListItem>
        </List>
      </Flex>
      <MyInfo />
    </Flex>
  );
}
