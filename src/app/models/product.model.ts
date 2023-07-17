export interface ProductColor {
  name: string;
  value: string;
}
export interface Product {
  discountLabel: string | number;
  oldPrice: number;
  hasOffer: boolean;
  id: number;
  colors: ProductColor[];
  qtyOnCart: number;
  title: string;
  description: string;
  picture: string;
  price: number;
  discount: number;
  discountType: 'percent' | 'fixed';
  categories: string[];
}
