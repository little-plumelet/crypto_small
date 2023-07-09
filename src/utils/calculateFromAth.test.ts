import { calculateFromAth } from './calculateFromAth';

describe('calculateFromAth', () => {
  it('should return the correct percentage drop', () => {
    const currentPrice = 150;
    const athPrice = 200;
    const expectedPercentageDrop = 25;

    const result = calculateFromAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageDrop);
  });

  it('should return 0 if the current price is equal to the ATH price', () => {
    const currentPrice = 200;
    const athPrice = 200;
    const expectedPercentageDrop = 0;

    const result = calculateFromAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageDrop);
  });

  it('should return a negative percentage if the current price is higher than the ATH price', () => {
    const currentPrice = 200;
    const athPrice = 150;
    const expectedPercentageDrop = -33.33333333333333;

    const result = calculateFromAth(currentPrice, athPrice);
    expect(result).toBe(expectedPercentageDrop);
  });

  it('should return the correct percentage drop with float numbers', () => {
    const currentPrice = Number(100.25.toFixed(20));
    const athPrice = 150.5;
    const expectedPercentageDrop = Number(33.38870431893688.toFixed(20));

    const result = calculateFromAth(currentPrice, athPrice);
    expect(result).toBeCloseTo(expectedPercentageDrop);
  });

  it('should return a negative percentage with float numbers', () => {
    const currentPrice = Number(200.55.toFixed(20));
    const athPrice = Number(250.35.toFixed(20));
    const expectedPercentageDrop = 19.89215098861593;

    const result = calculateFromAth(currentPrice, athPrice);
    expect(result).toBeCloseTo(expectedPercentageDrop);
  });
});
