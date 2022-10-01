import { NgModule } from '@angular/core';
import { LoginPageFormModule, LoginPageModule } from './login-page';

@NgModule({
  imports: [LoginPageModule, LoginPageFormModule],
})
export class AuthComponentsModule {}
