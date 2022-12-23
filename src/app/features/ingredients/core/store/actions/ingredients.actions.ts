import { createAction, props } from '@ngrx/store';
import { Ingredient } from '@fim/features/ingredients/core/models';

export const LOAD_INGREDIENTS = '[Ingredients] Load Ingredients';
export const LOAD_INGREDIENTS_SUCCESS =
  '[Ingredients] Load Ingredients Success';
export const LOAD_INGREDIENTS_FAILURE =
  '[Ingredients] Load Ingredients Failure';

export const ADD_INGREDIENT = '[Ingredients] Add Ingredient';
export const ADD_INGREDIENT_SUCCESS = '[Ingredients] Add Ingredient Success';
export const ADD_INGREDIENT_FAILURE = '[Ingredients] Add Ingredient Failure';

export const UPDATE_INGREDIENT = '[Ingredients] Update Ingredient';
export const UPDATE_INGREDIENT_SUCCESS =
  '[Ingredients] Update Ingredient Success';
export const UPDATE_INGREDIENT_FAILURE =
  '[Ingredients] Update Ingredient Failure';

export const DELETE_INGREDIENT = '[Ingredients] Delete Ingredient';
export const DELETE_INGREDIENT_SUCCESS =
  '[Ingredients] Delete Ingredient Success';
export const DELETE_INGREDIENT_FAILURE =
  '[Ingredients] Delete Ingredient Failure';

export const loadIngredients = createAction(LOAD_INGREDIENTS);

export const loadIngredientsSuccess = createAction(
  LOAD_INGREDIENTS_SUCCESS,
  props<{ ingredients: Ingredient[] }>()
);

export const loadIngredientsFailure = createAction(
  LOAD_INGREDIENTS_FAILURE,
  props<{ error: string }>()
);

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<Partial<Ingredient>>()
);

export const addIngredientSuccess = createAction(
  ADD_INGREDIENT_SUCCESS,
  props<Ingredient>()
);

export const addIngredientFailure = createAction(
  ADD_INGREDIENT_FAILURE,
  props<{ error: string }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ id: string; ingredient: Partial<Ingredient> }>()
);

export const updateIngredientSuccess = createAction(
  UPDATE_INGREDIENT_SUCCESS,
  props<Ingredient>()
);

export const updateIngredientFailure = createAction(
  UPDATE_INGREDIENT_FAILURE,
  props<{ error: string }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT,
  props<{ id: string }>()
);

export const deleteIngredientSuccess = createAction(
  DELETE_INGREDIENT_SUCCESS,
  props<{ id: string }>()
);

export const deleteIngredientFailure = createAction(
  DELETE_INGREDIENT_FAILURE,
  props<{ error: string }>()
);
