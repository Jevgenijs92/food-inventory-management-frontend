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
import { Product } from '@fim/features/products/core/models';
import { ErrorModel } from '@fim/shared/models';

@Component({
  selector: 'fim-products-table',
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  @Input()
  set data(products: ReadonlyArray<Product> | null) {
    this.dataSource = new MatTableDataSource<Product>(
      products ? [...products] : []
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input()
  dataLoadErrors: ErrorModel | null = null;

  @Input()
  isLoadingData: boolean | null = null;

  @Output()
  productUpdate: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  productDelete: EventEmitter<Product> = new EventEmitter<Product>();

  dataSource!: MatTableDataSource<Product>;
  filter: string | null = null;
  displayedColumns: string[] = [
    'name',
    'yieldPcs',
    'ingredientsQuantity',
    'price',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(searchText: string) {
    this.filter = searchText;
    this.dataSource.filter = searchText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdateProduct(product: Product) {
    this.productUpdate.emit(product);
  }

  onDeleteProduct(product: Product) {
    this.productDelete.emit(product);
  }

  getIngredientsCount(product: Product): number {
    return product?.ingredients?.length || 0;
  }
}
