import { NgModule } from '@angular/core';
import { IngredientsComponentsModule } from './components';
import { IngredientsRoutingModule } from './ingredients-routing.module';

@NgModule({
  imports: [IngredientsComponentsModule, IngredientsRoutingModule],
})
export class IngredientsModule {}
