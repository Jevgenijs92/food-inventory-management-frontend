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
import { Order } from '@fim/features/orders/core/models';

@Component({
  selector: 'fim-orders-table',
  templateUrl: './orders-table.component.html',
})
export class OrdersTableComponent {
  @Input()
  set data(orders: Order[] | null) {
    this.dataSource = new MatTableDataSource<Order>(orders ?? []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Output()
  orderUpdate: EventEmitter<Order> = new EventEmitter<Order>();

  @Output()
  orderDelete: EventEmitter<Order> = new EventEmitter<Order>();

  dataSource!: MatTableDataSource<Order>;
  filter: string | null = null;
  displayedColumns: string[] = ['id', 'deliveryDate', 'products', 'action'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(searchText: string) {
    this.filter = searchText;
    this.dataSource.filter = searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdateOrder(order: Order) {
    this.orderUpdate.emit(order);
  }

  onDeleteOrder(order: Order) {
    this.orderDelete.emit(order);
  }
}
