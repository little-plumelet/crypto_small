"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import { calculateFromAth } from "@/utils/calculateFromAth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Table } from "../table";

const fetcher = (url: string) =>
  fetch(url).then(
    (res) => res.json()
  );

  const fetcherAthPrices = (urls: string[]) => {
    const f = (url: string) => fetch(url).then(r => r.json())
    const promises = urls.map(url => f(url));
    return Promise.all(promises);
  }

export const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyFullData, setCurrencyFullData] = useState<ICurrencyData | null>(null);
  const pageSize = 10;
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=${pageSize}&offset=${currentPage * pageSize ?? 0}`;
  const { data: currencies, error } = useSWR<ICurrencyData>(url, fetcher);

  const athUrls = currencies?.data?.map((currency) => 'https://tstapi.cryptorank.io/v0/coins/' + currency?.slug?.toLowerCase());
  const { data: athData, error: athError} = useSWR(athUrls, fetcherAthPrices);

 

  useEffect(() => {
    if (currencies && athData) {
      const fromAthMap = athData?.reduce((acc, coin) => {
        return {
          ...acc,
          [coin?.data?.key]: calculateFromAth(coin?.data?.price?.USD, coin?.data?.athPrice?.USD),
        }
      }, {});

      setCurrencyFullData((prevState) => {
        if (prevState?.data) {
          return {
            ...prevState,
            data: prevState.data.map(currency => ({
            ...currency,
            fromAth: fromAthMap[currency?.slug] || 0
          }))}
        } else if (currencies) {
          return {...currencies};
        }
        return null;
      })
    }
    
  }, [athData, currencies])

  if (error || athError) {
    return <div>Error loading data</div>;
  }

  if (!currencies || !athData || !currencyFullData) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(currencies?.meta?.count / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Table data={currencyFullData?.data} />
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
