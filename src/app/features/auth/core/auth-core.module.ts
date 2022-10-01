import { NgModule } from '@angular/core';
import { LoginService } from './facades';

@NgModule({
  providers: [LoginService],
})
export class AuthCoreModule {}
