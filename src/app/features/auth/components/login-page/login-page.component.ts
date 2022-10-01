import { Component } from '@angular/core';
import { AuthService } from '../../core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fim-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(protected loginService: AuthService) {}

  invalidCredentials: boolean = false;

  login($event: { username: string; password: string }): void {
    this.loginService
      .login($event)
      .pipe(take(1))
      .subscribe({
        next: () => (this.invalidCredentials = false),
        error: () => (this.invalidCredentials = true),
      });
  }
}
