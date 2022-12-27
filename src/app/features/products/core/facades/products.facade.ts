import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductsActions from '../store/actions/products.actions';
import { Injectable } from '@angular/core';
import { ErrorModel } from '@fim/shared/models';
import { Product } from '@fim/features/products/core/models';
import {
  loadingProducts,
  loadingProductsFailure,
  selectProducts,
} from '@fim/features/products/core/store/selectors/products.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  constructor(private store: Store) {}

  products$: Observable<ReadonlyArray<Product> | null> =
    this.store.select(selectProducts);

  isLoadingProducts$: Observable<boolean> = this.store.select(loadingProducts);

  loadingProductsError$: Observable<ErrorModel> = this.store.select(
    loadingProductsFailure
  );

  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  addProduct(product: Partial<Product>) {
    this.store.dispatch(ProductsActions.addProduct(product));
  }

  updateProduct(id: string, product: Product) {
    this.store.dispatch(ProductsActions.updateProduct({ id, product }));
  }

  deleteProduct(id: string) {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }
}
