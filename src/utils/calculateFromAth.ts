export function calculateFromAth(currentPrice: number, athPrice: number) {
  let percentageDrop = ((athPrice - currentPrice) / athPrice * 100).toFixed(3);
  return percentageDrop;
}