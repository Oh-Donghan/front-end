import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  List,
  ListItem,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import MypageMenuItem from './MypageMenuItem';
import { FaGear } from 'react-icons/fa6';
import { IoAlertCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

export default function MyInfoCategory({
  menuItem = [],
  handleItemClick,
  changePassword,
  deleteAccount,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen} padding={'12px'}>
        Open
      </Button>
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" textAlign="center">
            선택해 주세요
          </DrawerHeader>
          <DrawerBody>
            <List
              spacing={{ base: 2, md: 3 }}
              display="flex"
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              flexWrap="wrap"
              gap={{ base: 2, md: 0 }}
            >
              {menuItem.map(item => (
                <MypageMenuItem
                  key={item.path}
                  item={item}
                  handleItemClick={handleItemClick}
                  onClose={onClose}
                />
              ))}
              <Flex direction="column" alignItems="center" gap="8px" pt={'20px'}>
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
                    padding="5px 0"
                  >
                    나가기
                  </Text>
                </Link>
              </Flex>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
