import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@fim/features/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(protected authService: AuthService, protected router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return this.router.parseUrl('login');
        }
        return isLoggedIn;
      })
    );
  }
}
