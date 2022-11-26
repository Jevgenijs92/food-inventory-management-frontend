import { Product } from '@fim/features/products/core/models';

export interface Order {
  id: string;
  deliveryDate: Date;
  products: OrderProduct[];
}

export interface OrderProduct extends Product {
  deliveryQuantity: number;
}

export interface OrderForm {
  id?: string;
  deliveryDate: Date;
  products: {
    id: string;
    deliveryQuantity: number;
  }[];
}
