import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent, LoginPageFormModule } from './';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageFormModule, MatCardModule],
})
export class LoginPageModule {}
