import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SortButton() {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get('sort');
  const currentUrl = location.pathname + location.search;

  const EtoK = option => {
    let res = '';

    if (option === 'recetnt') {
      res = '최신순';
    } else if (option === 'date') {
      res = '기간임박순';
    } else if (option === 'view') {
      res = '조회순';
    } else if (option === 'low') {
      res = '낮은가격순';
    } else if (option === 'high') {
      res = '높은가격순';
    }

    return res;
  };

  const handleMenuItemClick = option => {
    setSelectedOption(EtoK(option));

    if (!sort) {
      navigate(`${currentUrl}&sort=${option}`);
    } else {
      if (option === 'recent') {
        searchParams.delete('sort');
      } else {
        searchParams.set('sort', option);
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdKeyboardArrowDown size={18} />}
        bg="white"
        border="1px solid"
        borderColor="rgba(210,210,210,1)"
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.100' }}
        size={{ base: 'sm', lg: 'sm' }}
      >
        {selectedOption}
      </MenuButton>
      <MenuList zIndex={99} fontSize={15} paddingY={'0px'} color={'rgba(30,30,30,1)'}>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('recent')}>
          최근순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('date')}>
          기간 임박순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('view')}>
          조회순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('low')}>
          낮은 가격순
        </MenuItem>
        <MenuItem paddingY={'10px'} onClick={() => handleMenuItemClick('high')}>
          높은 가격순
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
