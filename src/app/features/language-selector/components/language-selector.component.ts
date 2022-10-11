import { Component } from '@angular/core';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { of } from 'rxjs';

@Component({
  selector: 'fim-language-selector',
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  constructor(protected translateService: AppTranslateService) {}

  languages$ = of(this.translateService.languages);

  language: string = this.translateService.currentLanguage;

  onChangeLanguage(lang: any) {
    this.translateService.use(lang);
    this.language = lang;
  }
}
