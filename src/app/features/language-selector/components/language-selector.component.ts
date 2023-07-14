import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'fim-language-selector',
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  constructor(protected translateService: AppTranslateService) {}

  languages$ = of(this.translateService.languages);

  language$: Observable<string> = this.translateService.language$;

  onChangeLanguage(lang: any) {
    this.translateService.language = lang;
  }
}
