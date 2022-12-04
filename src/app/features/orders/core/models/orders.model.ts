import { Product } from '@fim/features/products/core/models';

export interface Order {
  id: string;
  deliveryDate: Date;
  products: OrderProduct[];
}

export interface OrderProduct extends Product {
  deliveryQuantity: number;
}

export interface OrderedProduct extends OrderProduct {
  orderId?: string;
  deliveryDate?: Date;
  total: number;
}

export interface OrderForm {
  id?: string;
  deliveryDate: Date;
  products: {
    id: string;
    deliveryQuantity: number;
  }[];
}

export interface OrderFilters {
  fromDate: Date;
  toDate: Date;
}
