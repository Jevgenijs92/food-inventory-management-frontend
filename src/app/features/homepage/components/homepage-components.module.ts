import { NgModule } from '@angular/core';
import { HomepageCardComponent, HomepageComponent } from './homepage/';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from '../homepage-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomepageComponent, HomepageCardComponent],
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    HomepageRoutingModule,
    TranslateModule,
  ],
})
export class HomepageComponentsModule {}
