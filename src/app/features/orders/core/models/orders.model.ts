import { Product } from '@fim/features/products/core/models';

export interface Order {
  id: string;
  deliveryDate: Date;
  documentNumber?: string;
  products: OrderProduct[];
}

export interface OrderProduct extends Product {
  deliveryQuantity: number;
  sellPrice: number;
}

export interface OrderedProduct extends OrderProduct {
  orderId?: string;
  deliveryDate?: Date;
  documentNumber?: string;
  totalCost: number;
}

export interface OrderForm {
  id?: string;
  deliveryDate: Date;
  documentNumber?: string;
  products: {
    id: string;
    deliveryQuantity: number;
  }[];
}

export interface OrderFilters {
  fromDate: Date;
  toDate: Date;
}
