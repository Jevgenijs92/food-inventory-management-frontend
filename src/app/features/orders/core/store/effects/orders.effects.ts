import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as OrdersActions from '../actions/orders.actions';
import { of } from 'rxjs';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { OrdersService } from '@fim/features/orders/core/facades/orders.service';
import { Order } from '@fim/features/orders/core/models';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    protected ordersService: OrdersService,
    protected snackBarService: SnackBarService
  ) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.LOAD_ORDERS),
      switchMap(() =>
        this.ordersService.getOrders().pipe(
          map((orders) => OrdersActions.loadOrdersSuccess({ orders })),
          catchError((error) => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.ADD_ORDER),
      mergeMap((payload) =>
        this.ordersService.createOrder(payload).pipe(
          map((order) => OrdersActions.addOrderSuccess(order)),
          catchError((error) => of(OrdersActions.addOrderFailure({ error })))
        )
      )
    )
  );

  addOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.ADD_ORDER_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.add.success')
        )
      ),
    { dispatch: false }
  );

  addOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.ADD_ORDER_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.add.error')
        )
      ),
    { dispatch: false }
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.UPDATE_ORDER),
      mergeMap((payload: { id: string; order: Order }) =>
        this.ordersService.updateOrder(payload.id, payload.order).pipe(
          map((order) => OrdersActions.updateOrderSuccess(order)),
          catchError((error) => of(OrdersActions.updateOrderFailure(error)))
        )
      )
    )
  );

  updateOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.UPDATE_ORDER_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.update.success')
        )
      ),
    { dispatch: false }
  );

  updateOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.UPDATE_ORDER_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.update.error')
        )
      ),
    { dispatch: false }
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.DELETE_ORDER),
      mergeMap((payload: { id: string }) =>
        this.ordersService.deleteOrder(payload.id).pipe(
          map(() => OrdersActions.deleteOrderSuccess({ id: payload.id })),
          catchError((error) => of(OrdersActions.deleteOrderFailure(error)))
        )
      )
    )
  );

  deleteOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.DELETE_ORDER_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.delete.success')
        )
      ),
    { dispatch: false }
  );

  deleteOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrdersActions.DELETE_ORDER_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('orders.form.action.delete.error')
        )
      ),
    { dispatch: false }
  );
}
