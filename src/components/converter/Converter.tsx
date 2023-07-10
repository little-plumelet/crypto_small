"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  
  const { data: currencies, error, isLoading } = useSWR<ICurrencyData>(url, fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currencies) {
    return <div>Loading...</div>;
  }

  const handleamountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setAmount(value);
  };

  const handlefromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFrom(value);
  };

  const handletoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTo(value);
  };

  return (
    <div>
      <input type="number" value={amount} onChange={handleamountChange} />
      <div>
        <select value={from} onChange={handlefromChange}>
          {currencies?.data.map((currency) => {
            return <option key={currency?.id} value={currency?.name}>{currency?.name} ({currency?.symbol})</option>
          })}
        </select>
        <select value={to} onChange={handletoChange}>
        {currencies?.data.map((currency) => {
            return <option key={currency?.id} value={currency?.name}>{currency?.name} ({currency?.symbol})</option>
          })}
        </select>
      </div>
    </div>
  );
};
