import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageFormComponent } from './register-page-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegisterPageFormComponent],
  exports: [RegisterPageFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegisterPageFormModule {}
