import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from '../../core/models';
import { take } from 'rxjs/operators';
import { ProductsFormComponent } from '@fim/features/products/components/products-form/products-form.component';
import { ProductsService } from '@fim/features/products/core/facades/products.service';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { IngredientsFacade } from '@fim/features/ingredients/facades/ingredients.facade';
import { ProductsFacade } from '@fim/features/products/core/facades/products.facade';
import { ErrorModel } from '@fim/shared/models';

@Component({
  selector: 'fim-products-page',
  templateUrl: './products-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnDestroy {
  constructor(
    protected productsService: ProductsService,
    protected dialog: MatDialog,
    protected snackBarService: SnackBarService,
    protected ingredientsFacade: IngredientsFacade,
    protected productsFacade: ProductsFacade
  ) {
    this.productsFacade.loadProducts();
    this.ingredientsFacade.loadIngredients();
  }

  dialogRef: MatDialogRef<ProductsFormComponent> | null = null;

  products$: Observable<ReadonlyArray<Product> | null> =
    this.productsFacade.products$;

  isLoadingProducts$: Observable<boolean> =
    this.productsFacade.isLoadingProducts$;

  loadProductsError$: Observable<ErrorModel> =
    this.productsFacade.loadingProductsError$;

  onClickAddProduct() {
    this.openProductsFormDialog();
  }

  onClickUpdateProduct(product: Product) {
    this.openProductsFormDialog(product);
  }

  onClickDeleteProduct(product: Product) {
    this.productsFacade.deleteProduct(product.id);
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
      });
  }

  openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message);
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
