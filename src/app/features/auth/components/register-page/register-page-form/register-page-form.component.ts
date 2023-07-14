import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@fim/core';
import { AuthService } from '@fim/features/auth';
import {
  hasLowercase,
  hasNumber,
  hasSpecialCharacter,
  hasUppercase,
  passwordMismatch,
} from '@fim/features/auth/utils';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'fim-register-page-form',
  templateUrl: './register-page-form.component.html',
  styleUrls: ['./register-page-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ height: 0, overflow: 'hidden' }),
        animate('300ms', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        animate('300ms', style({ height: 0 })),
      ]),
    ]),
  ],
})
export class RegisterPageFormComponent {
  form: FormGroup;
  userExists: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    protected loadingService: LoadingService,
    protected authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          hasLowercase,
          hasUppercase,
          hasNumber,
          hasSpecialCharacter,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
    this.form.setValidators(passwordMismatch);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService
        .register({
          username: this.username?.value,
          password: this.password?.value,
        })
        .subscribe(
          () => {},
          (error) => {
            this.form.markAsUntouched();
            this.userExists = Boolean(error && error === 'USER_EXISTS');
          }
        );
    }
  }
}
