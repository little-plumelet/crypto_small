export function convertCurrencies(fromAmount: number, fromUsdPrice: number, toUsdPrice: number) {
  return Number(fromAmount.toFixed(10)) * Number(fromUsdPrice.toFixed(10)) / Number(toUsdPrice.toFixed(10));
}