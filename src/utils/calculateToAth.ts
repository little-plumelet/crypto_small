export function calculateToAth (currentPrice: number, athPrice: number) {
  let percentageIncrease = (athPrice - currentPrice) / (currentPrice / 100);
  return percentageIncrease;
}