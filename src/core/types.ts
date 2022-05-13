export type Item = {
  name: string;
  color: string;
  price: number;
  category: string;
  src: string;
};

export type ItemSort = 'name' | 'priceAsc' | 'priceDesc';
