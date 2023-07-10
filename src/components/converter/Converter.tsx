"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import { convertCurrencies } from "@/utils/convertCurrencies";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [fromName, setFromName] = useState<string>("");
  const [toName, setToName] = useState<string>("");
  const [converted, setConverted] = useState(0);
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=200`;
  
  const { data: currencies, error, isLoading } = useSWR<ICurrencyData>(url, fetcher);

  useEffect(() => {
    setConverted(convertCurrencies(amount, from, to));
  }, [from, to, amount])
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
    const name = ((event.target.selectedOptions[0].innerText).match(/(?<=\().*?(?=\))/))?.[0];
    setFrom(+value);
    setFromName(name ?? '');
  };

  const handletoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name = ((event.target.selectedOptions[0].innerText).match(/(?<=\().*?(?=\))/))?.[0];
    setTo(+value);
    setToName(name ?? '');
  };

  if (!from && currencies.data.length > 0) {
    setFrom(currencies?.data[0]?.values?.USD?.price || 0);
    setFromName(currencies?.data[0]?.symbol)
  }

  if (!to && currencies.data.length > 0) {
    setTo(currencies?.data[1]?.values?.USD?.price || 0);
    setToName(currencies?.data[1]?.symbol)
  }

  return (
    <div>
      <input type="number" value={amount} onChange={handleamountChange} />
      <div>
        <select value={from} onChange={handlefromChange}>
          {currencies?.data.map((currency) => {
            return <option key={currency?.id} value={currency?.values?.USD?.price}>{currency?.name} ({currency?.symbol})</option>
          })}
        </select>
        <select value={to} onChange={handletoChange}>
        {currencies?.data.map((currency) => {
            return <option key={currency?.id} value={currency?.values?.USD?.price}>{currency?.name} ({currency?.symbol})</option>
          })}
        </select>
      </div>
      <div>{amount} {fromName} = {converted.toFixed(2)} {toName}</div>
    </div>
  );
};
