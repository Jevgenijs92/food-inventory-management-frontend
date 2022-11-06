import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models';
import { take, tap } from 'rxjs/operators';
import {
  ProductsFormComponent
} from '@fim/features/products/components/products-form/products-form.component';
import {
  ProductsService
} from '@fim/features/products/core/facades/products.service';

@Component({
  selector: 'fim-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  constructor(
    protected productsService: ProductsService,
    protected dialog: MatDialog,
    protected matSnackBar: MatSnackBar,
    protected translateService: AppTranslateService
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
    const close = 'products.form.close';
    this.translateService
      .translate([message, close])
      .pipe(take(1))
      .subscribe((translations) =>
        this.matSnackBar.open(translations[message], translations[close], {
          duration: 5000,
        })
      );
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
