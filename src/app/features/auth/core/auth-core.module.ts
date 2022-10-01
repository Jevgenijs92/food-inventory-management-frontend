import { NgModule } from '@angular/core';
import { AuthService } from './facades';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, JwtInterceptor } from './interceptors';

@NgModule({
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AuthCoreModule {}
