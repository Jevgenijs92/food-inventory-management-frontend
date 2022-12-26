import { NgModule } from '@angular/core';
import { ProductsComponentsModule } from '@fim/features/products/components';
import { ProductsRoutingModule } from '@fim/features/products/products-routing.module';
import { IngredientsStoreModule } from '@fim/features/ingredients/core/store/ingredients-store.module';

@NgModule({
  imports: [
    ProductsComponentsModule,
    ProductsRoutingModule,
    IngredientsStoreModule,
  ],
})
export class ProductsModule {}
