import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoadingService } from '@fim/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fim-login-page-form',
  templateUrl: './login-page-form.component.html',
})
export class LoginPageFormComponent implements OnInit {
  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected loadingService: LoadingService
  ) {}

  @Input()
  invalidCredentials: boolean = false;

  @Output()
  submitForm = new EventEmitter<{
    username: string;
    password: string;
  }>();

  form!: FormGroup;

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit({ ...this.form.value });
    }
  }

  get isLoading(): Observable<boolean> {
    return this.loadingService.isLoading$;
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
