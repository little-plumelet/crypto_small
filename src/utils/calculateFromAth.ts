export function calculateFromAth(currentPrice: number, athPrice: number) {
  let percentageDrop = (athPrice  - currentPrice) / athPrice * 100;
  return percentageDrop;
}