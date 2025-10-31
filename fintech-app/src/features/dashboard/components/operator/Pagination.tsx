import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@/components/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 text-sm font-medium rounded-md ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronsLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="hidden sm:flex">{renderPageNumbers()}</div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronsRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
