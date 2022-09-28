import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageFormModule } from './login-page-form/login-page-form.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageFormModule, MatCardModule],
})
export class LoginPageModule {}
