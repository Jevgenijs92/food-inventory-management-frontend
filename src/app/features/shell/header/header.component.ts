import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@fim/features/auth';

@Component({
  selector: 'fim-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(protected authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
