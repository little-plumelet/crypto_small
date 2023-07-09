"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import { useState } from "react";
import useSWR from "swr";
import { Table } from "../table";

const fetcher = (url: string) =>
  fetch(url).then(
    (res) => res.json()
  );

export const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=${pageSize}&offset=${currentPage * pageSize ?? 0}`;
  const { data, error } = useSWR<ICurrencyData>(url, fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(data?.meta?.count / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Table data={data.data} />
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </>
  );
};
