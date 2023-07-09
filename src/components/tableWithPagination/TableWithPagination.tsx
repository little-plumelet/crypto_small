"use client"
import { Currency } from '@/interfaces/currency';
import { useState } from 'react';
import MOCK_DATA from '../../../mockdata.json';
import { Table } from '../table';

export const TableWithPagination = () => {
  const data = MOCK_DATA.data as Array<Currency>;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return(
    <>
        <Table data={data} />
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </>
  )
}