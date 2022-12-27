import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';
import { ErrorState, ErrorType } from '@fim/shared/models';
import { Order } from '@fim/features/orders/core/models';

export interface OrdersState {
  orders: ReadonlyArray<Order> | null;
  isLoading: boolean;
  error: ErrorState | null;
}

export const initialState: OrdersState = {
  orders: null,
  isLoading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, () => ({
    ...initialState,
    isLoading: true,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => {
    return {
      ...state,
      orders,
      isLoading: false,
      error: null,
    };
  }),
  on(OrdersActions.loadOrdersFailure, (_state, { error }) => ({
    ...initialState,
    isLoading: false,
    error: {
      hasError: true,
      errorMessage: error,
      errorType: ErrorType.COLLECTION,
    },
  })),
  on(
    OrdersActions.addOrder,
    OrdersActions.updateOrder,
    OrdersActions.deleteOrder,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(OrdersActions.addOrderSuccess, (state, order) => {
    let orders: Order[] = [order];
    if (state.orders) {
      orders = [...orders, ...state.orders];
    }
    return {
      ...state,
      orders,
      isLoading: false,
    };
  }),
  on(
    OrdersActions.addOrderFailure,
    OrdersActions.updateOrderFailure,
    OrdersActions.deleteOrderFailure,
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
  on(OrdersActions.updateOrderSuccess, (state, order) => ({
    ...state,
    isLoading: false,
    orders:
      state.orders?.map((element) =>
        element.id === order.id ? order : element
      ) ?? null,
  })),
  on(OrdersActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    orders: state.orders?.filter((element) => element.id !== id) ?? null,
  }))
);
