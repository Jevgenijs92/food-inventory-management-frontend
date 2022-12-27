import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from '@fim/features/products/core/store/reducers/products.reducer';
import { ProductsEffects } from '@fim/features/products/core/store/effects/products.effects';

export const PRODUCTS_FEATURE = 'products';

@NgModule({
  imports: [
    StoreModule.forFeature(PRODUCTS_FEATURE, productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsStoreModule {}
