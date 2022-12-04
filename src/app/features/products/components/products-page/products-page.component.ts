import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
export class ProductsPageComponent implements OnDestroy {
  constructor(
    protected productsService: ProductsService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService
  ) {
    this.loadProducts();
  }

  dialogRef: MatDialogRef<ProductsFormComponent> | null = null;

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
    this.dialogRef = this.dialog.open(ProductsFormComponent);
    if (product) {
      this.dialogRef.componentInstance.product = product;
    }
    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.dialogRef = null;
        this.loadProducts();
      });
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

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }


}
