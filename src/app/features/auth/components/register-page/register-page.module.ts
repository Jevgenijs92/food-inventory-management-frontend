import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page.component';
import { MatCardModule } from '@angular/material/card';
import { LanguageSelectorComponentsModule } from '@fim/features/language-selector/components/language-selector-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterPageFormModule } from './register-page-form';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    LanguageSelectorComponentsModule,
    TranslateModule,
    RegisterPageFormModule,
  ],
})
export class RegisterPageModule {}
