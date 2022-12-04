import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@fim/features/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(protected router: Router, protected authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const error = err.error.message || err.statusText;
        if (
          err?.status === HttpStatusCode.Unauthorized &&
          err?.url !== this.authService.refreshTokenUrl &&
          this.router.url !== '/login'
        ) {
          return this._refreshTokenOrLogout(req, next, error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private _refreshTokenOrLogout(
    req: HttpRequest<any>,
    next: HttpHandler,
    error: any
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap((success) => {
        if (success) {
          req = req.clone({
            setHeaders: {
              Authorization: this.authService.authorizationHeader,
            },
          });
          return next.handle(req);
        } else {
          this.authService.logout();
          return throwError(error);
        }
      })
    );
  }
}
