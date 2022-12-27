import { NgModule } from '@angular/core';
import { OrdersComponentsModule } from './components';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersStoreModule } from '@fim/features/orders/core/store/orders-store.module';
import { ProductsStoreModule } from '@fim/features/products/core/store/products-store.module';

@NgModule({
  imports: [
    OrdersComponentsModule,
    OrdersRoutingModule,
    OrdersStoreModule,
    ProductsStoreModule,
  ],
})
export class OrdersModule {}
