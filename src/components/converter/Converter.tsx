"use client";

import React, { useState } from 'react';

export const Converter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

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
          <option value="">Select Option 1</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select value={to} onChange={handletoChange}>
          <option value="">Select Option 2</option>
          <option value="optionA">Option A</option>
          <option value="optionB">Option B</option>
        </select>
      </div>
    </div>
  );
};
