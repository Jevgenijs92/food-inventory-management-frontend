import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { of } from 'rxjs';
import { SnackBarService } from '@fim/features/snack-bar/services/snack-bar.service';
import { ProductsService } from '@fim/features/products/core/facades/products.service';
import { Product } from '@fim/features/products/core/models';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    protected productsService: ProductsService,
    protected snackBarService: SnackBarService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.LOAD_PRODUCTS),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.ADD_PRODUCT),
      mergeMap((payload) =>
        this.productsService.createProduct(payload).pipe(
          map((product) => ProductsActions.addProductSuccess(product)),
          catchError((error) =>
            of(ProductsActions.addProductFailure({ error }))
          )
        )
      )
    )
  );

  addProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.ADD_PRODUCT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar('products.form.action.add.success')
        )
      ),
    { dispatch: false }
  );

  addProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.ADD_PRODUCT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('products.form.action.add.error')
        )
      ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UPDATE_PRODUCT),
      mergeMap((payload: { id: string; product: Product }) =>
        this.productsService.updateProduct(payload.id, payload.product).pipe(
          map((product) => ProductsActions.updateProductSuccess(product)),
          catchError((error) => of(ProductsActions.updateProductFailure(error)))
        )
      )
    )
  );

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UPDATE_PRODUCT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar(
            'products.form.action.update.success'
          )
        )
      ),
    { dispatch: false }
  );

  updateProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UPDATE_PRODUCT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('products.form.action.update.error')
        )
      ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DELETE_PRODUCT),
      mergeMap((payload: { id: string }) =>
        this.productsService.deleteProduct(payload.id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id: payload.id })),
          catchError((error) => of(ProductsActions.deleteProductFailure(error)))
        )
      )
    )
  );

  deleteProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.DELETE_PRODUCT_SUCCESS),
        tap(() =>
          this.snackBarService.openSnackBar(
            'products.form.action.delete.success'
          )
        )
      ),
    { dispatch: false }
  );

  deleteProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.DELETE_PRODUCT_FAILURE),
        tap(() =>
          this.snackBarService.openSnackBar('products.form.action.delete.error')
        )
      ),
    { dispatch: false }
  );
}
