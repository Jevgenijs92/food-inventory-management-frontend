import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INGREDIENTS_FEATURE } from '@fim/features/ingredients/store/ingredients-store.module';
import { IngredientsState } from '@fim/features/ingredients/store/ingredients.reducer';
import { ErrorModel, ErrorType } from '@fim/shared/models';

export const selectIngredientsState =
  createFeatureSelector<IngredientsState>(INGREDIENTS_FEATURE);

export const selectIngredients = createSelector(
  selectIngredientsState,
  (state) => state.ingredients
);

export const loadingIngredients = createSelector(
  selectIngredientsState,
  (state) => state.isLoading
);

export const loadingIngredientsFailure = createSelector(
  selectIngredientsState,
  (state): ErrorModel =>
    state.error?.errorType === ErrorType.COLLECTION
      ? {
          hasError: state.error.hasError,
          errorMessage: state.error.errorMessage,
        }
      : {
          hasError: false,
          errorMessage: '',
        }
);
