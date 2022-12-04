import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthStorageService } from '../services';
import { AuthToken } from '@fim/features/auth';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  readonly authUrl = `${environment.baseUrl}/auth`;
  readonly refreshTokenUrl = `${this.authUrl}/refresh`;

  private readonly isRefreshingTokenSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isRefreshingToken$: Observable<boolean> =
    this.isRefreshingTokenSource.asObservable();

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

  /**
   * This method checks whether the token refresh is already in progress
   *
   * If token refresh is in progress method returns Observable of boolean
   * which will emit only when the refresh process is finished
   *
   * If token refresh is not in progress, then refresh token process is started
   * and on success will return Observable of true, on failure - of false
   *
   * If refresh token doesn't exist, method returns Observable of false
   */
  refreshToken(): Observable<boolean> {
    const refreshToken = this.authStorageService.token.refresh_token;
    if (refreshToken) {
      return this.isRefreshingToken$.pipe(
        take(1),
        switchMap((refreshTokenInProgress) => {
          if (refreshTokenInProgress) {
            return this.isRefreshingToken$.pipe(
              filter((loading) => !loading),
              map((loading) => !loading)
            );
          } else {
            this.isRefreshingTokenSource.next(true);
            return this.retrieveTokensWithRefreshToken(refreshToken).pipe(
              finalize(() => this.isRefreshingTokenSource.next(false))
            );
          }
        })
      );
    }
    return of(false);
  }

  protected retrieveTokensWithRefreshToken(
    refreshToken: string
  ): Observable<boolean> {
    return this.http
      .post<AuthToken>(
        this.refreshTokenUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .pipe(
        tap((token) => {
          this.authStorageService.token = token;
        }),
        map(() => true),
        catchError(() => {
          return of(false);
        })
      );
  }

  isUserLoggedIn(): Observable<boolean> {
    return of(Boolean(this.authStorageService.token.access_token));
  }

  get authorizationHeader(): string {
    return `Bearer ${this.authStorageService.token.access_token}`;
  }
}
