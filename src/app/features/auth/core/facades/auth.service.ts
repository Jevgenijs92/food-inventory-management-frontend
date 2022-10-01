import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthStorageService } from '../services';
import { AuthToken } from '@fim/features/auth';
import { take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected http: HttpClient,
    protected authStorageService: AuthStorageService,
    protected router: Router
  ) {}

  protected authUrl = `${environment.baseUrl}/auth`;

  login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthToken> {
    const url = `${this.authUrl}/login`;
    return this.http.post<AuthToken>(url, credentials).pipe(
      tap((token) => {
        this.authStorageService.token = token;
        this.router.navigate(['']);
      })
    );
  }

  logout() {
    this.revokeToken().pipe(take(1)).subscribe();
    this.authStorageService.token = {};
    this.router.navigate(['login']);
  }

  revokeToken(): Observable<any> {
    const url = `${this.authUrl}/logout`;
    return this.http.post<any>(url, {});
  }

  isUserLoggedIn(): Observable<boolean> {
    return of(Boolean(this.authStorageService.token.access_token));
  }
}
