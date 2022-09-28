import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  protected authUrl = `${environment.baseUrl}/auth`;

  login(credentials: { username: string; password: string }) {
    const url = `${this.authUrl}/login`;
    return this.http.post<any>(url, credentials);
  }
}
