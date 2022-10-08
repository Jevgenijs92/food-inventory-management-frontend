import { NgModule } from '@angular/core';
import { ProductsComponentsModule } from '@fim/features/products/components';
import { ProductsRoutingModule } from '@fim/features/products/products-routing.module';

@NgModule({
  imports: [ProductsComponentsModule, ProductsRoutingModule],
})
export class ProductsModule {}
