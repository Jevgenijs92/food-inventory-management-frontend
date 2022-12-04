import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@fim/features/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(protected authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Authorization')) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.authorizationHeader,
        },
      });
    }
    return next.handle(req);
  }
}