import { Flex, List, ListItem, useBreakpointValue, useDisclosure, Text } from '@chakra-ui/react';
import { FaGear, FaUser } from 'react-icons/fa6';
import { IoAlertCircle } from 'react-icons/io5';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import ChangePassword from '../components/mypage/modal/ChangePassword';
import DeleteAccount from '../components/mypage/modal/DeleteAccount';
import { FaShoppingCart } from 'react-icons/fa';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { SiLightning } from 'react-icons/si';
import MypageMenuItem from '../components/mypage/myInfo/MypageMenuItem';
import MyInfoCategory from '../components/mypage/myInfo/MyInfoCategory';
import { MdLogout } from 'react-icons/md';

export default function AuctionMyPage() {
  const navigate = useNavigate();
  const changePassword = useDisclosure();
  const deleteAccount = useDisclosure();
  const initialRef = useRef(null);

  // 메뉴 항목 정의
  const menuItems = [
    { icon: <FaUser />, label: '내 정보', path: '/mypage/myinfo' },
    { icon: <FaShoppingCart />, label: '구매 내역', path: '/mypage/buy' },
    { icon: <RiDiscountPercentFill />, label: '판매 내역', path: '/mypage/sell' },
    { icon: <SiLightning />, label: '포인트 내역', path: '/mypage/charge' },
    { icon: <SiLightning />, label: 'QnA', path: '/mypage/QnA' },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const menuList = useBreakpointValue({
    base: (
      <MyInfoCategory
        menuItem={menuItems}
        handleItemClick={handleItemClick}
        changePassword={changePassword}
        deleteAccount={deleteAccount}
      />
    ),
    md: (
      <Flex
        direction={{ base: 'row', md: 'column' }}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
        p={{ base: '8px', md: '24px' }}
        w={{ base: '100%', md: '200px' }}
        h="auto" // 높이를 auto로 설정하여 내용물에 맞게 조정
        borderRight={'1px solid rgba(70,70,70,1)'}
        textColor={'rgba(70,70,70,1)'}
      >
        <List
          spacing={{ base: 2, md: 3 }}
          display="flex"
          flexDirection={{ base: 'row', md: 'column' }}
          flexWrap="wrap"
          gap={{ base: 2, md: 0 }}
        >
          {menuItems.map(item => (
            <MypageMenuItem key={item.path} item={item} handleItemClick={handleItemClick} />
          ))}
        </List>
        <List
          spacing={{ base: 2, md: 3 }}
          display="flex"
          flexDirection={{ base: 'row', md: 'column' }}
          flexWrap="wrap"
          gap={{ base: 2, md: 0 }}
        >
          <ListItem className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all">
            <FaGear /> <div onClick={changePassword.onOpen}>비밀번호 변경</div>
          </ListItem>
          <ListItem className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all">
            <IoAlertCircle /> <div onClick={deleteAccount.onOpen}>회원탈퇴</div>
          </ListItem>
          <Link to={'/'} className="flex items-center cursor-pointer">
            <MdLogout size={20} color="rgba(100,100,100,1)" />
            <Text
              cursor={'pointer'}
              color="rgba(100,100,100,1)"
              fontWeight={'semibold'}
              marginLeft={2}
            >
              나가기
            </Text>
          </Link>
        </List>
      </Flex>
    ),
  });

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
      <Flex
        align="center"
        justify="center"
        w="100%"
        minHeight="100vh" // 부모 컨테이너에 최소 높이 설정
        overflow="hidden"
        className="bg-slate-200"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          w={{ base: '90%', lg: '1200px' }}
          h={{ base: '95vh', lg: '672px' }}
          bg="white"
          borderRadius="10px"
          overflow="auto"
          boxShadow="1px 1px 10px rgba(0,0,0,0.1)"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari에서 스크롤바 숨기기
            },
            '-ms-overflow-style': 'none', // IE, Edge에서 스크롤바 숨기기
            'scrollbar-width': 'none', // Firefox에서 스크롤바 숨기기
          }}
        >
          {menuList}
          <Flex flex="1" direction="column" p="24px">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
