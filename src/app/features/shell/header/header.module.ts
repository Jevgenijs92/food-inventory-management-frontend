import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LanguageSelectorComponentsModule } from '@fim/features/language-selector/components/language-selector-components.module';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    LanguageSelectorComponentsModule,
    MatMenuModule,
    CommonModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
