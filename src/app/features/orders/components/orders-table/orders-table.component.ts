import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderedProduct } from '@fim/features/orders/core/models';

@Component({
  selector: 'fim-orders-table',
  templateUrl: './orders-table.component.html',
})
export class OrdersTableComponent {
  @Input()
  set data(orderedProducts: OrderedProduct[] | null) {
    this.dataSource = new MatTableDataSource<OrderedProduct>(
      orderedProducts ?? []
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Output()
  orderUpdate: EventEmitter<string> = new EventEmitter<string>();

  dataSource!: MatTableDataSource<OrderedProduct>;
  displayedColumns: string[] = [
    'deliveryDate',
    'documentNumber',
    'name',
    'price',
    'deliveryQuantity',
    'totalCost',
    'sellPrice',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onUpdateOrder(orderedProduct: OrderedProduct) {
    this.orderUpdate.emit(orderedProduct.orderId);
  }

  getTotalAmount(field: 'totalCost' | 'sellPrice'): number {
    return this.dataSource.data.reduce(
      (acc, orderedProduct) => acc + orderedProduct[field],
      0
    );
  }

  getTotalQuantity(): number {
    return this.dataSource.data.reduce(
      (acc, orderedProduct) => acc + orderedProduct.deliveryQuantity,
      0
    );
  }
}
