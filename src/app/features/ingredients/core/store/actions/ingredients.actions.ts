import { createAction, props } from '@ngrx/store';
import { Ingredient } from '@fim/features/ingredients/core/models';

export const LOAD_INGREDIENTS = '[Ingredients] Load Ingredients';
export const LOAD_INGREDIENTS_SUCCESS =
  '[Ingredients] Load Ingredients Success';
export const LOAD_INGREDIENTS_FAILURE =
  '[Ingredients] Load Ingredients Failure';

export const loadIngredients = createAction(LOAD_INGREDIENTS);

export const loadIngredientsSuccess = createAction(
  LOAD_INGREDIENTS_SUCCESS,
  props<{ ingredients: Ingredient[] }>()
);

export const loadIngredientsFailure = createAction(
  LOAD_INGREDIENTS_FAILURE,
  props<{ error: string }>()
);
