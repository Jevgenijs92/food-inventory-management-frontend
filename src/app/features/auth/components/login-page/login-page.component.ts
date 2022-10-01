import { Component } from '@angular/core';
import { LoginService } from '../../core';

@Component({
  selector: 'fim-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(protected loginService: LoginService) {}

  login($event: { username: string; password: string }) {
    this.loginService.login($event).subscribe(console.log);
  }
}
