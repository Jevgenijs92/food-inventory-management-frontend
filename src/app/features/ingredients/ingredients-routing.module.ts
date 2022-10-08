import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: IngredientsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
