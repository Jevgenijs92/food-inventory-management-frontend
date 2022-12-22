import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INGREDIENTS_FEATURE
} from '@fim/features/ingredients/core/store/ingredients-store.module';
import {
  IngredientsState
} from '@fim/features/ingredients/core/store/reducers/ingredients.reducer';

export const selectIngredientsState =
  createFeatureSelector<IngredientsState>(INGREDIENTS_FEATURE);

export const selectIngredients = createSelector(selectIngredientsState,
  (state) => state.ingredients);

export const loadingIngredients = createSelector(selectIngredientsState,
  (state) => state.isLoading);

export const loadingIngredientsFailure = createSelector(selectIngredientsState,
  (state) => ({
    hasError: state.hasError,
    errorMessage: state.errorMessage
  }));
