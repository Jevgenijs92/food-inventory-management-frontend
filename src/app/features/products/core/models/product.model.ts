import { Ingredient } from '@fim/features/ingredients/core/models';

export interface Product {
  id: string;
  name: string;
  price: number;
  ingredients: {
    price: number;
    quantity: number;
    ingredient: Ingredient;
  }[];
}
