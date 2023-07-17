import { CartProduct } from './cart-product.model';

export interface Order {
  id?: number;
  total?: number;
  identificationNumber?: number | string;
  address?: string;
  items?: CartProduct[];
}
