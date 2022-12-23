import { Injectable } from '@angular/core';
import { AuthToken } from '@fim/features/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  get token(): AuthToken {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return JSON.parse(token);
    }

    return {};
  }

  set token(token: AuthToken) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  }
}

const TOKEN = 'token';
