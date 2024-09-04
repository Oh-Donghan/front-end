import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  '전체',
  '남성의류',
  '여성의류',
  '키덜트',
  '가전제품',
  '도서제품',
  '유아용품',
  '굿즈',
  '식품',
  '뷰티',
  '반려동물',
  '가구',
  '스포츠',
  '생활용품',
  '식물',
  '악세사리',
  '기타',
];

export default function CategorySortButton() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '전체';
  const sort = searchParams.get('sort');
  const [selectedOption, setSelectedOption] = useState(category);
  const navigate = useNavigate();

  const handleMenuItemClick = async e => {
    const selectedCategory = e.target.getAttribute('value');
    setSelectedOption(selectedCategory);

    const params = new URLSearchParams();
    params.set('mainCategory', selectedCategory);
    if (sort !== null) {
      params.set('sort', sort);
    }

    navigate(`/auctions?${params.toString()}`);
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
        mr={2}
      >
        {selectedOption}
      </MenuButton>
      <MenuList zIndex={99} fontSize={15} paddingY={'0px'} color={'rgba(30,30,30,1)'}>
        {categories.map((category, i) => {
          return (
            <MenuItem key={i} paddingY={'10px'} onClick={handleMenuItemClick} value={category}>
              {category}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
