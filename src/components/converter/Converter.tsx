"use client";

import { ICurrencyData } from "@/interfaces/currencyData";
import { convertCurrencies } from "@/utils/convertCurrencies";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Container = styled.div`
  padding: 20px 50px;
`;

const ContainerCalc = styled.div`
  padding: 20px 50px;
  margin: 20px 0;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 5px;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const Select = styled.select`
  padding: 5px;
  flex: 1;
`;

const Result = styled.div`
  margin-top: 20px;
  font-wright: bold;
`;

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [fromName, setFromName] = useState<string>("");
  const [toName, setToName] = useState<string>("");
  const [converted, setConverted] = useState(0);
  const url = `https://api.cryptorank.io/v1/currencies/?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=200`;

  const { data: currencies, error } = useSWR<ICurrencyData>(url, fetcher);

  useEffect(() => {
    setConverted(convertCurrencies(amount, from, to));
  }, [from, to, amount]);
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!currencies) {
    return <div>Loading...</div>;
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setAmount(value);
  };

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name =
      event.target.selectedOptions[0].innerText.match(/(?<=\().*?(?=\))/)?.[0];
    setFrom(+value);
    setFromName(name ?? "");
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const name =
      event.target.selectedOptions[0].innerText.match(/(?<=\().*?(?=\))/)?.[0];
    setTo(+value);
    setToName(name ?? "");
  };

  if (!from && currencies.data.length > 0) {
    setFrom(currencies?.data[0]?.values?.USD?.price || 0);
    setFromName(currencies?.data[0]?.symbol);
  }

  if (!to && currencies.data.length > 0) {
    setTo(currencies?.data[1]?.values?.USD?.price || 0);
    setToName(currencies?.data[1]?.symbol);
  }

  console.log('to = ', to);
  console.log('toName = ', toName);
  console.log('from = ', from);
  return (
    <Container>
      <h3>Cryptocurrency Converter Calculator</h3>
      <ContainerCalc>
        <label htmlFor="amount">amount:</label>
        <Input id="amount" type="number" value={amount} onChange={handleAmountChange} />
        <SelectContainer>
          <Select name="from" value={from} onChange={handleFromChange}>
            {currencies?.data.map((currency) => {
              return (
                <option key={currency?.id} value={currency?.values?.USD?.price}>
                  {currency?.name} ({currency?.symbol})
                </option>
              );
            })}
          </Select>
          <Select name="to" value={to} onChange={handleToChange}>
            {currencies?.data.map((currency) => {
              return (
                <option key={currency?.id} value={currency?.values?.USD?.price}>
                  {currency?.name} ({currency?.symbol})
                </option>
              );
            })}
          </Select>
        </SelectContainer>
        <Result>
          {amount} {fromName} = {converted.toFixed(2)} {toName}
        </Result>
      </ContainerCalc>
    </Container>
  );
};
