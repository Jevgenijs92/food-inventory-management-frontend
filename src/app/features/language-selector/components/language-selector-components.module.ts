import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [LanguageSelectorComponent],
})
export class LanguageSelectorComponentsModule {}
