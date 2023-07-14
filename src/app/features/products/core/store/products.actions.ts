import { createAction, props } from '@ngrx/store';
import { Product } from '@fim/features/products/core/models';

export const LOAD_PRODUCTS = '[Products] Load Products';
export const LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const LOAD_PRODUCTS_FAILURE = '[Products] Load Products Failure';

export const ADD_PRODUCT = '[Products] Add Product';
export const ADD_PRODUCT_SUCCESS = '[Products] Add Product Success';
export const ADD_PRODUCT_FAILURE = '[Products] Add Product Failure';

export const UPDATE_PRODUCT = '[Products] Update Product';
export const UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success';
export const UPDATE_PRODUCT_FAILURE = '[Products] Update Product Failure';

export const DELETE_PRODUCT = '[Products] Delete Product';
export const DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success';
export const DELETE_PRODUCT_FAILURE = '[Products] Delete Product Failure';

export const loadProducts = createAction(LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  LOAD_PRODUCTS_FAILURE,
  props<{ error: string }>()
);

export const addProduct = createAction(ADD_PRODUCT, props<Partial<Product>>());

export const addProductSuccess = createAction(
  ADD_PRODUCT_SUCCESS,
  props<Product>()
);

export const addProductFailure = createAction(
  ADD_PRODUCT_FAILURE,
  props<{ error: string }>()
);

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{ id: string; product: Partial<Product> }>()
);

export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<Product>()
);

export const updateProductFailure = createAction(
  UPDATE_PRODUCT_FAILURE,
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  DELETE_PRODUCT,
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  DELETE_PRODUCT_SUCCESS,
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  DELETE_PRODUCT_FAILURE,
  props<{ error: string }>()
);
