import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { RiNotionFill } from 'react-icons/ri';
import { IoChevronDownSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <div className="hidden w-full p-10 lg:block">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold min-w-[200px]">Logo</div>
          <div className="flex items-center justify-between min-w-[550px] underline">
            <Link to={'https://github.com/JinhwanB'}>BE 배진환</Link>
            <Link to={'https://github.com/Cathunder'}>BE 박민규</Link>
            <Link to={'https://github.com/sh035'}>BE 엄석현</Link>
            <Link to={'https://github.com/seungh22'}>BE 양승희</Link>
            <Link to={'https://github.com/Oh-Donghan'}>FE 오동환</Link>
            <Link to={'https://github.com/choiinyoung13'}>FE 최인영</Link>
          </div>
          <div className="flex justify-end items-center min-w-[200px]">
            <Link to={'https://github.com/UsedAuction'} className="mr-2">
              <FaGithub size={26} />
            </Link>
            <Link to={'https://www.notion.so/2-0754ba713fe14f9c8c883323d7f45452'}>
              <RiNotionFill size={30} />
            </Link>
          </div>
        </div>
        <div className="w-full border border-gray-400 mt-[70px]"></div>
        <div className="flex justify-between w-[580px] mt-[30px] m-auto text-sm">
          <span className="footerText">© 2023 Relume. All rights reserved.</span>
          <span className="footerText">Privacy Policy</span>
          <span className="footerText">Terms of Service</span>
          <span className="footerText">Cookies Settings</span>
        </div>
      </div>
      <div className="px-4 py-6 min-w-[375px] lg:hidden">
        <Menu matchWidth>
          {({ isOpen }) => (
            <div className="relative z-50">
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<IoChevronDownSharp size={20} />}
                width={'full'}
                backgroundColor={'white'}
                justifyContent="flex-start"
                textAlign="left"
                fontWeight="bold"
              >
                팀원 소개
              </MenuButton>
              <MenuList position={'relative'} zIndex={'40'} fontSize={'0.9rem'}>
                <MenuItem as="a" href="https://github.com/JinhwanB">
                  BE 배진환
                </MenuItem>
                <MenuItem as="a" href="https://github.com/Cathunder">
                  BE 박민규
                </MenuItem>
                <MenuItem as="a" href="https://github.com/sh035">
                  BE 엄석현
                </MenuItem>
                <MenuItem as="a" href="https://github.com/seungh22">
                  BE 양승희
                </MenuItem>
                <MenuItem as="a" href="https://github.com/Oh-Donghan">
                  FE 오동환
                </MenuItem>
                <MenuItem as="a" href="https://github.com/choiinyoung13">
                  FE 최인영
                </MenuItem>
              </MenuList>
            </div>
          )}
        </Menu>
        <Menu matchWidth>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<IoChevronDownSharp size={20} />}
                width={'full'}
                backgroundColor={'white'}
                justifyContent="flex-start"
                textAlign="left"
                fontWeight="bold"
              >
                ABOUT
              </MenuButton>
              <MenuList position={'relative'} zIndex={'50'} fontSize={'0.9rem'}>
                <MenuItem>© 2023 Relume. All rights reserved.</MenuItem>
                <MenuItem as="a" href="#">
                  Privacy Policy
                </MenuItem>
                <MenuItem as="a" href="#">
                  Terms of Service
                </MenuItem>
                <MenuItem as="a" href="#">
                  Cookies Settings
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <Menu matchWidth>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<IoChevronDownSharp size={20} />}
                width={'full'}
                backgroundColor={'white'}
                justifyContent="flex-start"
                textAlign="left"
                fontWeight="bold"
              >
                CONTECT
              </MenuButton>
              <MenuList position={'relative'} zIndex={'50'} fontSize={'0.9rem'}>
                <MenuItem as="a" href="https://github.com/UsedAuction">
                  github
                </MenuItem>
                <MenuItem
                  as="a"
                  href="https://sky-blue-900.notion.site/2-0754ba713fe14f9c8c883323d7f45452?pvs=4"
                >
                  notion
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
