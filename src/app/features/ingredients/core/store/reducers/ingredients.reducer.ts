import { Ingredient } from '@fim/features/ingredients/core/models';
import { createReducer, on } from '@ngrx/store';
import * as IngredientsActions from '../actions/ingredients.actions';

export interface IngredientsState {
  ingredients: ReadonlyArray<Ingredient> | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const initialState: IngredientsState = {
  ingredients: null,
  isLoading: false,
  hasError: false,
  errorMessage: '',
};

export const ingredientsReducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, () => ({
    ...initialState,
    isLoading: true,
  })),
  on(IngredientsActions.loadIngredientsSuccess, (state, { ingredients }) => {
    return {
      ...state,
      ingredients,
      isLoading: false,
      hasError: false,
      errorMessage: '',
    };
  }),
  on(IngredientsActions.loadIngredientsFailure, (_state, { error }) => ({
    ...initialState,
    isLoading: false,
    hasError: true,
    errorMessage: error,
  }))
);
