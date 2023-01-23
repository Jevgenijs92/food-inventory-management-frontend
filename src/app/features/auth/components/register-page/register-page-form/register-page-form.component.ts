import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoadingService } from '@fim/core';
import { AuthService } from '@fim/features/auth';

const passwordMismatch = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    confirmPassword?.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword?.setErrors(null);
  }
  return null;
};

@Component({
  selector: 'fim-register-page-form',
  templateUrl: './register-page-form.component.html',
  styles: [
    `
      .error__user-exists {
        max-width: 200px;
        text-align: center;
      }
    `,
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
      password: ['', [Validators.required]],
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
