import { Ingredient } from 'src/app/features/ingredients/models';

export interface Product {
  id: string;
  name: string;
  price: number;
  yieldPcs: number;
  ingredients: {
    price: number;
    quantity: number;
    ingredient: Ingredient;
  }[];
}
