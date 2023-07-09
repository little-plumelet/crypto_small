export interface Currency {
  id: number;
  name: string;
  values: {
    USD: {
      price: number;
      marketCap: number;
    }
  }
  circulatingSupply: number;
  category: string;
};