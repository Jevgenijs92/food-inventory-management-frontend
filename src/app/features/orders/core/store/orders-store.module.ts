import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ordersReducer } from '@fim/features/orders/core/store/reducers/orders.reducer';
import { OrdersEffects } from '@fim/features/orders/core/store/effects/orders.effects';

export const ORDERS_FEATURE = 'orders';

@NgModule({
  imports: [
    StoreModule.forFeature(ORDERS_FEATURE, ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
  ],
})
export class OrdersStoreModule {}
