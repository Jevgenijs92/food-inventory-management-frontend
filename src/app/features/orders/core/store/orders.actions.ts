import { createAction, props } from '@ngrx/store';
import { Order } from '@fim/features/orders/core/models';

export const LOAD_ORDERS = '[Orders] Load Orders';
export const LOAD_ORDERS_SUCCESS = '[Orders] Load Orders Success';
export const LOAD_ORDERS_FAILURE = '[Orders] Load Orders Failure';

export const ADD_ORDER = '[Orders] Add Order';
export const ADD_ORDER_SUCCESS = '[Orders] Add Order Success';
export const ADD_ORDER_FAILURE = '[Orders] Add Order Failure';

export const UPDATE_ORDER = '[Orders] Update Order';
export const UPDATE_ORDER_SUCCESS = '[Orders] Update Order Success';
export const UPDATE_ORDER_FAILURE = '[Orders] Update Order Failure';

export const DELETE_ORDER = '[Orders] Delete Order';
export const DELETE_ORDER_SUCCESS = '[Orders] Delete Order Success';
export const DELETE_ORDER_FAILURE = '[Orders] Delete Order Failure';

export const loadOrders = createAction(LOAD_ORDERS);

export const loadOrdersSuccess = createAction(
  LOAD_ORDERS_SUCCESS,
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  LOAD_ORDERS_FAILURE,
  props<{ error: string }>()
);

export const addOrder = createAction(ADD_ORDER, props<Partial<Order>>());

export const addOrderSuccess = createAction(ADD_ORDER_SUCCESS, props<Order>());

export const addOrderFailure = createAction(
  ADD_ORDER_FAILURE,
  props<{ error: string }>()
);

export const updateOrder = createAction(
  UPDATE_ORDER,
  props<{ id: string; order: Partial<Order> }>()
);

export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<Order>()
);

export const updateOrderFailure = createAction(
  UPDATE_ORDER_FAILURE,
  props<{ error: string }>()
);

export const deleteOrder = createAction(DELETE_ORDER, props<{ id: string }>());

export const deleteOrderSuccess = createAction(
  DELETE_ORDER_SUCCESS,
  props<{ id: string }>()
);

export const deleteOrderFailure = createAction(
  DELETE_ORDER_FAILURE,
  props<{ error: string }>()
);
