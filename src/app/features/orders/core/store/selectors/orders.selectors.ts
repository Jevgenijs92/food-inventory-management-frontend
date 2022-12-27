import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorModel, ErrorType } from '@fim/shared/models';
import { ORDERS_FEATURE } from '@fim/features/orders/core/store/orders-store.module';
import { OrdersState } from '@fim/features/orders/core/store/reducers/orders.reducer';

export const selectOrdersState =
  createFeatureSelector<OrdersState>(ORDERS_FEATURE);

export const selectOrders = createSelector(
  selectOrdersState,
  (state) => state.orders
);

export const loadingOrders = createSelector(
  selectOrdersState,
  (state) => state.isLoading
);

export const loadingOrdersFailure = createSelector(
  selectOrdersState,
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
