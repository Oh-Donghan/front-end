import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default function SortButton() {
  const [selectedOption, setSelectedOption] = useState('추천순');

  const handleMenuItemClick = option => {
    setSelectedOption(option);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdKeyboardArrowDown size={18} />}
        bg="white"
        border="1px solid"
        borderColor="gray.300"
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.100' }}
        size={{ base: 'sm', lg: 'sm' }}
      >
        {selectedOption}
      </MenuButton>
      <MenuList zIndex={99} fontSize={15} paddingY={'0px'} color={'rgba(30,30,30,1)'}>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('최근순')}>
          최근순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('기간 임박순')}>
          기간 임박순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('조회순')}>
          조회순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('낮은 가격순')}>
          낮은 가격순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('높은 가격순')}>
          높은 가격순
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
