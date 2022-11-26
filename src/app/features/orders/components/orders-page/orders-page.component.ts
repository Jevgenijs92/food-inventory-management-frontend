import { Component } from '@angular/core';
import {
  OrdersService
} from '@fim/features/orders/core/facades/orders.service';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '@fim/features/orders/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  OrdersFormComponent
} from '@fim/features/orders/components/orders-form/orders-form.component';
import {
  SnackBarService
} from '@fim/features/snack-bar/services/snack-bar.service';

@Component({
  selector: 'fim-orders-page',
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent {
  constructor(
    protected ordersService: OrdersService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService
  ) {
    this.loadOrders();
  }

  ordersSource: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.ordersSource.asObservable();

  onClickAddOrder() {
    this.openOrdersFormDialog();
  }

  onClickUpdateOrder(order: Order) {
    this.openOrdersFormDialog(order);
  }

  onClickDeleteOrder(order: Order) {
    this.ordersService
      .deleteOrder(order.id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loadOrders();
          this.openSnackBar('orders.form.deleted');
        },
        (error) => {
          this.openSnackBar(error);
        }
      );
  }

  openOrdersFormDialog(order?: Order) {
    const dialogRef = this.dialog.open(OrdersFormComponent);
    if (order) {
      dialogRef.componentInstance.order = order;
    }
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.loadOrders());
  }

  loadOrders() {
    this.ordersService
      .getOrders()
      .pipe(
        take(1),
        tap((orders) => this.ordersSource.next(orders))
      )
      .subscribe();
  }

  private openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
  }
}
