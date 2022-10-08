import { NgModule } from '@angular/core';
import { HomepageComponentsModule } from './components';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  imports: [HomepageComponentsModule, HomepageRoutingModule],
})
export class HomepageModule {}
