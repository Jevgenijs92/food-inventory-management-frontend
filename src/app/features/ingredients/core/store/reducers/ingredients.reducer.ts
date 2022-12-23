import { Ingredient } from '@fim/features/ingredients/core/models';
import { createReducer, on } from '@ngrx/store';
import * as IngredientsActions from '../actions/ingredients.actions';
import { ErrorState, ErrorType } from '@fim/shared/models';

export interface IngredientsState {
  ingredients: ReadonlyArray<Ingredient> | null;
  isLoading: boolean;
  error: ErrorState | null;
}

export const initialState: IngredientsState = {
  ingredients: null,
  isLoading: false,
  error: null,
};

export const ingredientsReducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, () => ({
    ...initialState,
    isLoading: true,
    error: null,
  })),
  on(IngredientsActions.loadIngredientsSuccess, (state, { ingredients }) => {
    return {
      ...state,
      ingredients,
      isLoading: false,
      error: null,
    };
  }),
  on(IngredientsActions.loadIngredientsFailure, (_state, { error }) => ({
    ...initialState,
    isLoading: false,
    error: {
      hasError: true,
      errorMessage: error,
      errorType: ErrorType.COLLECTION,
    },
  })),
  on(
    IngredientsActions.addIngredient,
    IngredientsActions.updateIngredient,
    IngredientsActions.deleteIngredient,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(IngredientsActions.addIngredientSuccess, (state, ingredient) => {
    let ingredients: Ingredient[] = [ingredient];
    if (state.ingredients) {
      ingredients = [...ingredients, ...state.ingredients];
    }
    return {
      ...state,
      ingredients,
      isLoading: false,
    };
  }),
  on(
    IngredientsActions.addIngredientFailure,
    IngredientsActions.updateIngredientFailure,
    IngredientsActions.deleteIngredientFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error: {
        hasError: true,
        errorMessage: error,
        errorType: ErrorType.ELEMENT,
      },
    })
  ),
  on(IngredientsActions.updateIngredientSuccess, (state, ingredient) => ({
    ...state,
    isLoading: false,
    ingredients:
      state.ingredients?.map((element) =>
        element.id === ingredient.id ? ingredient : element
      ) ?? null,
  })),
  on(IngredientsActions.deleteIngredientSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    ingredients:
      state.ingredients?.filter((element) => element.id !== id) ?? null,
  }))
);
