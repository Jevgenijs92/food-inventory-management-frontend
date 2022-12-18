import { Component, OnDestroy } from '@angular/core';
import {
  OrdersService
} from '@fim/features/orders/core/facades/orders.service';
import { map, take, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  Order,
  OrderedProduct,
  OrderFilters,
} from '@fim/features/orders/core/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  OrdersFormComponent
} from '@fim/features/orders/components/orders-form/orders-form.component';
import {
  SnackBarService
} from '@fim/features/snack-bar/services/snack-bar.service';
import {
  ProductsService
} from '@fim/features/products/core/facades/products.service';
import { Product } from '@fim/features/products/core/models';

@Component({
  selector: 'fim-orders-page',
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent implements OnDestroy {
  constructor(
    protected ordersService: OrdersService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService,
    protected productsService: ProductsService
  ) {
    this.loadOrders();
    this.loadProducts();
  }

  private products: Product[] = [];

  dialogRef: MatDialogRef<OrdersFormComponent> | null = null;

  private filtersSource: BehaviorSubject<OrderFilters> =
    new BehaviorSubject<OrderFilters>(this.getInitialFilters());
  public filters$: Observable<OrderFilters> = this.filtersSource.asObservable();

  private ordersSource: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(
    []
  );
  orderedProducts$: Observable<OrderedProduct[]> = combineLatest([
    this.ordersSource.asObservable(),
    this.filters$,
  ]).pipe(
    map(([orders, filters]) => this.filterOrders(orders, filters)),
    map(this.convertToOrderedProducts, this)
  );

  onClickAddOrder() {
    this.openOrdersFormDialog();
  }

  onClickUpdateOrder(orderId: string) {
    this.openOrdersFormDialog(
      this.ordersSource.value.find((order) => order.id === orderId)
    );
  }

  protected openOrdersFormDialog(order?: Order) {
    this.dialogRef = this.dialog.open(OrdersFormComponent);
    this.dialogRef.componentInstance.products = this.products;
    if (order) {
      this.dialogRef.componentInstance.order = order;
    }
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef = null;
        this.loadOrders();
      });
  }

  protected loadOrders() {
    this.ordersService
      .getOrders()
      .pipe(
        take(1),
        tap((orders) => this.ordersSource.next(orders))
      )
      .subscribe();
  }

  protected convertToOrderedProducts(orders: Order[]) {
    const orderedProducts: OrderedProduct[] = [];
    orders.forEach((order) => {
      order.products.forEach((product) =>
        orderedProducts.push({
          ...product,
          orderId: order.id,
          deliveryDate: order.deliveryDate,
          documentNumber: order.documentNumber,
          totalCost: product.price * product.deliveryQuantity,
        })
      );
    });
    return orderedProducts;
  }

  protected filterOrders(orders: Order[], filter: OrderFilters): Order[] {
    return orders.filter((order) => {
      const date = new Date(order.deliveryDate);
      return (
        date.getTime() >= filter.fromDate?.getTime() &&
        date.getTime() <= filter.toDate?.getTime()
      );
    });
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

  private loadProducts() {
    this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => (this.products = products));
  }
}
