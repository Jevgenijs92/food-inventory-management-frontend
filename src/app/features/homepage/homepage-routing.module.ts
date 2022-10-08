import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'ingredients',
    loadChildren: () =>
      import('@fim-features/ingredients/ingredients.module').then(
        (m) => m.IngredientsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('@fim-features/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('@fim-features/orders/orders.module').then((m) => m.OrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
