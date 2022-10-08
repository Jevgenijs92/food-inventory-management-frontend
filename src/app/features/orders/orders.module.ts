import { NgModule } from '@angular/core';
import { OrdersComponentsModule } from './components';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [OrdersComponentsModule, OrdersRoutingModule],
})
export class OrdersModule {}
