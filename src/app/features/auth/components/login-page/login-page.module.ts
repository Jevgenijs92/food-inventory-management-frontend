import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageFormModule } from './login-page-form';
import { MatCardModule } from '@angular/material/card';
import { LoginPageComponent } from './login-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageFormModule, MatCardModule, TranslateModule],
})
export class LoginPageModule {}
