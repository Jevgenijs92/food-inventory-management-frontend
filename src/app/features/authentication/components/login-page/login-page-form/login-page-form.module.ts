import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageFormComponent } from './login-page-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginPageFormComponent],
  exports: [LoginPageFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class LoginPageFormModule {}
