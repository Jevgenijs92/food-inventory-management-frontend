import { NgModule } from '@angular/core';
import { AuthComponentsModule } from './components';
import { AuthCoreModule } from './core';

@NgModule({
  imports: [AuthComponentsModule, AuthCoreModule]
})
export class AuthModule {}
