import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models';
import { take, tap } from 'rxjs/operators';
import {
  ProductsFormComponent
} from '@fim/features/products/components/products-form/products-form.component';
import {
  ProductsService
} from '@fim/features/products/core/facades/products.service';
import {
  SnackBarService
} from '@fim/features/snack-bar/services/snack-bar.service';

@Component({
  selector: 'fim-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  constructor(
    protected productsService: ProductsService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService
  ) {
    this.loadProducts();
  }

  productsSource: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  products$: Observable<Product[]> = this.productsSource.asObservable();

  onClickAddProduct() {
    this.openProductsFormDialog();
  }

  onClickUpdateProduct(product: Product) {
    this.openProductsFormDialog(product);
  }

  onClickDeleteProduct(product: Product) {
    this.productsService
      .deleteProduct(product.id)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loadProducts();
          this.openSnackBar('products.form.deleted');
        },
        (error) => {
          this.openSnackBar(error);
        }
      );
  }

  openProductsFormDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductsFormComponent);
    if (product) {
      dialogRef.componentInstance.product = product;
    }
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.loadProducts());
  }

  openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
  }

  loadProducts() {
    this.productsService
      .getProducts()
      .pipe(
        take(1),
        tap((ingredients) => this.productsSource.next(ingredients))
      )
      .subscribe();
  }
}
