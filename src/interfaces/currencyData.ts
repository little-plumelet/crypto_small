import { ICurrency } from "./currency";

export interface ICurrencyData {
  data: ICurrency[];
  meta: {
    count: number
  }
}