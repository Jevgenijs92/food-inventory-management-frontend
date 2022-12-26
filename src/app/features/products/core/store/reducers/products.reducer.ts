import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../actions/products.actions';
import { ErrorState, ErrorType } from '@fim/shared/models';
import { Product } from '@fim/features/products/core/models';

export interface ProductsState {
  products: ReadonlyArray<Product> | null;
  isLoading: boolean;
  error: ErrorState | null;
}

export const initialState: ProductsState = {
  products: null,
  isLoading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, () => ({
    ...initialState,
    isLoading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products,
      isLoading: false,
      error: null,
    };
  }),
  on(ProductsActions.loadProductsFailure, (_state, { error }) => ({
    ...initialState,
    isLoading: false,
    error: {
      hasError: true,
      errorMessage: error,
      errorType: ErrorType.COLLECTION,
    },
  })),
  on(
    ProductsActions.addProduct,
    ProductsActions.updateProduct,
    ProductsActions.deleteProduct,
    (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(ProductsActions.addProductSuccess, (state, product) => {
    let products: Product[] = [product];
    if (state.products) {
      products = [...products, ...state.products];
    }
    return {
      ...state,
      products,
      isLoading: false,
    };
  }),
  on(
    ProductsActions.addProductFailure,
    ProductsActions.updateProductFailure,
    ProductsActions.deleteProductFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error: {
        hasError: true,
        errorMessage: error,
        errorType: ErrorType.ELEMENT,
      },
    })
  ),
  on(ProductsActions.updateProductSuccess, (state, product) => ({
    ...state,
    isLoading: false,
    products:
      state.products?.map((element) =>
        element.id === product.id ? product : element
      ) ?? null,
  })),
  on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    products: state.products?.filter((element) => element.id !== id) ?? null,
  }))
);
