import { Product } from './product.model';

export class CartProduct {
  id?: number;
  quantity: number;
  title: string;
  description: string;
  picture: string;
  unitPrice: number;
  total: number;
  categories: string[];

  constructor(product: Product, quantity: number) {
    this.id = product.id;
    this.quantity = quantity;
    this.title = product.title;
    this.description = product.description;
    this.picture = product.picture;
    this.unitPrice = product.price;
    this.total = product.price * quantity;
    this.categories = product.categories;
  }
}
