import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fim-login-page-form',
  templateUrl: './login-page-form.component.html',
})
export class LoginPageFormComponent implements OnInit {
  constructor(protected formBuilder: FormBuilder) {}

  @Output() submitForm = new EventEmitter<{
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
}
