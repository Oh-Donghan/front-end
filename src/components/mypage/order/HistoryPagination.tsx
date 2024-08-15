import { Box } from '@chakra-ui/react';
import { sampleData } from './OrderTable';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function HistoryPagination() {
  return (
    <>
      {sampleData.length >= 5 && (
        <Box className="flex gap-2 mx-auto mt-12 pb-6">
          <div className="bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer">
            <FaAngleLeft />
          </div>
          <div className="bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer">
            1
          </div>
          <div className="bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer">
            2
          </div>
          <div className="bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer">
            3
          </div>
          <div className="bg-slate-100 w-6 h-6 text-xl flex items-center justify-center rounded-md cursor-pointer">
            <FaAngleRight />
          </div>
        </Box>
      )}
    </>
  );
}
