export interface ICurrency {
  id: number;
  name: string;
  slug: string;
  values: {
    USD: {
      price: number;
      marketCap: number;
    }
  }
  circulatingSupply: number;
  category: string;
  toAth: number;
  fromAth: number;
};