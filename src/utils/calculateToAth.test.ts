import { calculateToAth } from './calculateToAth';

describe('calculateToAth', () => {
  it('should return the correct percentage increase', () => {
    const currentPrice = 100;
    const athPrice = 150;
    const expectedPercentageIncrease = 50;

    const result = calculateToAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageIncrease);
  });

  it('should return 0 if the current price is equal to the ATH price', () => {
    const currentPrice = 200;
    const athPrice = 200;
    const expectedPercentageIncrease = 0;

    const result = calculateToAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageIncrease);
  });

  it('should return a negative percentage if the current price is higher than the ATH price', () => {
    const currentPrice = 250;
    const athPrice = 200;
    const expectedPercentageIncrease = -20;

    const result = calculateToAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageIncrease);
  });

  it('should return the correct percentage increase with float numbers', () => {
    const currentPrice = Number(75.5.toFixed(20));
    const athPrice = Number(100.25.toFixed(20));
    const expectedPercentageIncrease = 32.78145695364238;

    const result = calculateToAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageIncrease);
  });
});
