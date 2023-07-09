"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import { calculateFromAth } from "@/utils/calculateFromAth";
import { calculateToAth } from "@/utils/calculateToAth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Table } from "../table";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fetcherAthPrices = (urls: string[]) => {
  const f = (url: string) => fetch(url).then((r) => r.json());
  const promises = urls.map((url) => f(url));
  return Promise.all(promises);
};

export const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyFullData, setCurrencyFullData] =
    useState<ICurrencyData | null>(null);
  const pageSize = 10;
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&limit=${pageSize}&offset=${currentPage * pageSize ?? 0}`;
  const { data: currencies, error } = useSWR<ICurrencyData>(url, fetcher);

  const athUrls = currencies?.data?.map(
    (currency) =>
      "https://tstapi.cryptorank.io/v0/coins/" + currency?.slug?.toLowerCase()
  );
  const { data: athData, error: athError } = useSWR(athUrls, fetcherAthPrices);

  useEffect(() => {
    if (currencies && athData) {
      const fromAthMap = athData?.reduce((acc, coin) => {
        return {
          ...acc,
          [coin?.data?.key]: calculateFromAth(
            coin?.data?.price?.USD.toFixed(20),
            coin?.data?.athPrice?.USD.toFixed(20)
          ),
        };
      }, {});

      const toAthMap = athData?.reduce((acc, coin) => {
        return {
          ...acc,
          [coin?.data?.key]: calculateToAth(
            coin?.data?.price?.USD.toFixed(20),
            coin?.data?.athPrice?.USD.toFixed(20)
          ),
        };
      }, {});

      setCurrencyFullData({
        ...currencies,
        data:
          currencies?.data?.map((currency) => ({
            ...currency,
            fromAth: fromAthMap[currency?.slug] || 0,
            toAth: toAthMap[currency?.slug] || 0,
          })) || [],
      });
    }
  }, [athData, currencies]);

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
      <br></br>
      <div style={{width: "100vw", display: "flex", justifyContent: "center"}}>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{"padding":"0 20px"}}>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      </div>
    </>
  );
};
