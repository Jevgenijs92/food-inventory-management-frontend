import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorModel, ErrorType } from '@fim/shared/models';
import { PRODUCTS_FEATURE } from '@fim/features/products/core/store/products-store.module';
import { ProductsState } from '@fim/features/products/core/store/products.reducer';

export const selectProductsState =
  createFeatureSelector<ProductsState>(PRODUCTS_FEATURE);

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const loadingProducts = createSelector(
  selectProductsState,
  (state) => state.isLoading
);

export const loadingProductsFailure = createSelector(
  selectProductsState,
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
