import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  Order,
  OrderedProduct,
  OrderFilters,
} from '@fim/features/orders/core/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { OrdersFormComponent } from '@fim/features/orders/components/orders-form/orders-form.component';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { OrdersFacade } from '@fim/features/orders/core/facades/orders.facade';
import { ErrorModel } from '@fim/shared/models';
import { ProductsFacade } from '@fim/features/products/core/facades/products.facade';

@Component({
  selector: 'fim-orders-page',
  templateUrl: './orders-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnDestroy {
  constructor(
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService,
    protected ordersFacade: OrdersFacade,
    protected productsFacade: ProductsFacade
  ) {
    this.ordersFacade.loadOrders();
    this.productsFacade.loadProducts();
  }

  isLoadingOrders$: Observable<boolean> = this.ordersFacade.isLoadingOrders$;

  loadOrdersError$: Observable<ErrorModel> =
    this.ordersFacade.loadingOrdersError$;

  dialogRef: MatDialogRef<OrdersFormComponent> | null = null;

  private filtersSource: BehaviorSubject<OrderFilters> =
    new BehaviorSubject<OrderFilters>(this.getInitialFilters());
  public filters$: Observable<OrderFilters> = this.filtersSource.asObservable();

  orderedProducts$: Observable<ReadonlyArray<OrderedProduct> | null> =
    combineLatest([this.ordersFacade.orders$, this.filters$]).pipe(
      map(([orders, filters]) => this.filterOrders(orders, filters)),
      map(this.convertToOrderedProducts, this)
    );

  onClickAddOrder() {
    this.openOrdersFormDialog();
  }

  onClickUpdateOrder(orderId: string) {
    this.ordersFacade.orders$.pipe(take(1)).subscribe((orders) => {
      if (orders) {
        this.openOrdersFormDialog(orders.find((order) => order.id === orderId));
      }
    });
  }

  protected openOrdersFormDialog(order?: Order) {
    this.dialogRef = this.dialog.open(OrdersFormComponent);
    if (order) {
      this.dialogRef.componentInstance.order = order;
    }
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef = null;
      });
  }

  protected convertToOrderedProducts(
    orders: ReadonlyArray<Order> | null
  ): ReadonlyArray<OrderedProduct> | null {
    if (orders) {
      const orderedProducts: OrderedProduct[] = [];
      orders.forEach((order) => {
        order.products.forEach((product) =>
          orderedProducts.push({
            ...product,
            orderId: order.id,
            deliveryDate: order.deliveryDate,
            documentNumber: order.documentNumber,
            totalCost:
              (product.price * product.deliveryQuantity) / product.yieldPcs,
          })
        );
      });
      return orderedProducts;
    }
    return null;
  }

  protected filterOrders(
    orders: ReadonlyArray<Order> | null,
    filter: OrderFilters
  ): ReadonlyArray<Order> | null {
    if (orders) {
      return orders.filter((order) => {
        const date = new Date(order.deliveryDate);
        return (
          date.getTime() >= filter.fromDate?.getTime() &&
          date.getTime() <= filter.toDate?.getTime()
        );
      });
    }
    return null;
  }

  protected getInitialFilters(): OrderFilters {
    return this.getFiltersFromYearStartToCurrentDate();
  }

  private getFiltersFromYearStartToCurrentDate(): OrderFilters {
    const toDate: Date = new Date();
    toDate.setHours(23, 59, 59);
    const fromDate: Date = new Date(toDate.getFullYear(), 0, 1);
    return {
      fromDate,
      toDate,
    };
  }

  onFromDateChange(fromDate: Date) {
    if (fromDate) {
      const filters = this.filtersSource.value;
      this.filtersSource.next({
        ...filters,
        fromDate,
      });
    }
  }

  onToDateChange(toDate: Date) {
    if (toDate) {
      const filters = this.filtersSource.value;
      toDate.setHours(23, 59, 59);
      this.filtersSource.next({
        ...filters,
        toDate,
      });
    }
  }

  onClickFilterFromYearStart() {
    this.filtersSource.next(this.getFiltersFromYearStartToCurrentDate());
  }

  onClickFilterCurrentMonth() {
    const date: Date = new Date();
    const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const toDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    this.filtersSource.next({
      fromDate,
      toDate,
    });
  }

  onClickFilterLastYear() {
    const date: Date = new Date();
    const fromDate = new Date(date.getFullYear() - 1, 0, 1);
    const toDate = new Date(date.getFullYear(), 0, 0, 23, 59, 59);
    this.filtersSource.next({
      fromDate,
      toDate,
    });
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
