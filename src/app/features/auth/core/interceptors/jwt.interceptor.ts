import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorageService } from '@fim/features/auth/core/services/auth-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(protected authStorageService: AuthStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authStorageService.token;
    if (token.access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
    }
    return next.handle(req);
  }
}