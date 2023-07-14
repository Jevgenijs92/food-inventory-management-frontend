import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as OrdersActions from '../store/orders.actions';
import { Injectable } from '@angular/core';
import { ErrorModel } from '@fim/shared/models';
import { Order } from '@fim/features/orders/core/models';
import {
  loadingOrders,
  loadingOrdersFailure,
  selectOrders,
} from '@fim/features/orders/core/store/orders.selectors';

@Injectable({
  providedIn: 'root',
})
export class OrdersFacade {
  constructor(private store: Store) {}

  orders$: Observable<ReadonlyArray<Order> | null> =
    this.store.select(selectOrders);

  isLoadingOrders$: Observable<boolean> = this.store.select(loadingOrders);

  loadingOrdersError$: Observable<ErrorModel> =
    this.store.select(loadingOrdersFailure);

  loadOrders() {
    this.store.dispatch(OrdersActions.loadOrders());
  }

  addOrder(order: Partial<Order>) {
    this.store.dispatch(OrdersActions.addOrder(order));
  }

  updateOrder(id: string, order: Order) {
    this.store.dispatch(OrdersActions.updateOrder({ id, order }));
  }

  deleteOrder(id: string) {
    this.store.dispatch(OrdersActions.deleteOrder({ id }));
  }
}
