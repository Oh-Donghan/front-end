import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoChevronDownSharp } from 'react-icons/io5';

export default function Footer() {
  return (
    <>
      <div className="hidden w-full p-10 lg:block">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold min-w-[200px]">Logo</div>
          <div className="flex items-center justify-between min-w-[550px] underline">
            <Link>Link One</Link>
            <Link>Link Two</Link>
            <Link>Link Three</Link>
            <Link>Link Four</Link>
            <Link>Link Five</Link>
            <Link>Link Six</Link>
          </div>
          <div className="flex justify-end items-center min-w-[200px]">
            <span className="mr-3">
              <FaFacebook size={23} />
            </span>
            <span className="mr-3">
              <FaInstagram size={25} />
            </span>
            <span>
              <FaYoutube size={25} />
            </span>
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
      <div className="px-4 py-6 lg:hidden">
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
                LINKS
              </MenuButton>
              <MenuList position={'relative'} zIndex={'40'} fontSize={'0.9rem'}>
                <MenuItem as="a" href="#">
                  Link One
                </MenuItem>
                <MenuItem as="a" href="#">
                  Link Two
                </MenuItem>
                <MenuItem as="a" href="#">
                  Link Three
                </MenuItem>
                <MenuItem as="a" href="#">
                  Link Four
                </MenuItem>
                <MenuItem as="a" href="#">
                  Link Five
                </MenuItem>
                <MenuItem as="a" href="#">
                  Link Six
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
                <MenuItem as="a" href="https://www.facebook.com/">
                  facebook
                </MenuItem>
                <MenuItem as="a" href="https://www.instagram.com/">
                  instagram
                </MenuItem>
                <MenuItem as="a" href="https://www.youtube.com/">
                  youtube
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
