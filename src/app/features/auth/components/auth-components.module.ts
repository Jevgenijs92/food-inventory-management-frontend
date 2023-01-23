import { NgModule } from '@angular/core';
import { LoginPageFormModule, LoginPageModule } from './login-page';
import { RegisterPageModule, RegisterPageFormModule } from './register-page';

@NgModule({
  imports: [
    LoginPageModule,
    LoginPageFormModule,
    RegisterPageModule,
    RegisterPageFormModule,
  ],
})
export class AuthComponentsModule {}
