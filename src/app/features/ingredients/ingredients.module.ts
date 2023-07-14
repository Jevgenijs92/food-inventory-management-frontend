import { NgModule } from '@angular/core';
import { IngredientsComponentsModule } from './components';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsStoreModule } from '@fim/features/ingredients/store/ingredients-store.module';

@NgModule({
  imports: [
    IngredientsComponentsModule,
    IngredientsRoutingModule,
    IngredientsStoreModule,
  ],
})
export class IngredientsModule {}
