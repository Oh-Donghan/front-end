import { Box } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function HistoryPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <>
      <Box className="flex gap-2 mx-auto mt-12 pb-6">
        <div
          className={`bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handlePrevious}
        >
          <FaAngleLeft />
        </div>
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {i + 1}
          </div>
        ))}
        <div
          className={`bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleNext}
        >
          <FaAngleRight />
        </div>
      </Box>
    </>
  );
}
