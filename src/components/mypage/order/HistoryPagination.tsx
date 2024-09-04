import { Box } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function HistoryPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const maxVisiblePages = 5;

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1),
  );

  const visiblePages = Array.from(
    { length: Math.min(maxVisiblePages, totalPages) },
    (_, i) => startPage + i,
  );

  // page가 1이상일때만 보이게
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box className="flex gap-2 mx-auto mt-12 pb-6">
      <Box
        as="div"
        w="6"
        h="6"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
        bg="slate.100"
        onClick={handlePrevious}
        opacity={currentPage === 1 ? 0.5 : 1}
      >
        <FaAngleLeft />
      </Box>

      {visiblePages.map(page => (
        <Box
          key={page}
          w="6"
          h="6"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          bg={currentPage === page ? 'blue.500' : 'slate.100'}
          color={currentPage === page ? 'white' : 'black'}
          rounded="md"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Box>
      ))}

      <Box
        as="div"
        w="6"
        h="6"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
        bg="slate.100"
        onClick={handleNext}
        opacity={currentPage === totalPages ? 0.5 : 1}
      >
        <FaAngleRight />
      </Box>
    </Box>
  );
}
