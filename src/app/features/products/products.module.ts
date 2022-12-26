import { NgModule } from '@angular/core';
import { ProductsComponentsModule } from '@fim/features/products/components';
import { ProductsRoutingModule } from '@fim/features/products/products-routing.module';
import { IngredientsStoreModule } from '@fim/features/ingredients/core/store/ingredients-store.module';
import { ProductsStoreModule } from '@fim/features/products/core/store/products-store.module';
import { SnackBarModule } from '@fim/features/snack-bar/snack-bar.module';

@NgModule({
  imports: [
    ProductsComponentsModule,
    ProductsRoutingModule,
    ProductsStoreModule,
    IngredientsStoreModule,
    SnackBarModule,
  ],
})
export class ProductsModule {}
