import { convertCurrencies } from './convertCurrencies';

describe('convertCurrencies', () => {
  it('should convert currencies correctly', () => {
    const fromAmount = 100;
    const fromUsdPrice = 1.2;
    const toUsdPrice = 0.8;

    const result = convertCurrencies(fromAmount, fromUsdPrice, toUsdPrice);
    expect(result).toBe(150);
  });
});
