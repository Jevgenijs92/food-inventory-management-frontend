import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorageService } from '@fim/core/services/language-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  constructor(
    protected translate: TranslateService,
    protected languageStorage: LanguageStorageService
  ) {
    this.use(this.languageStorage.language);
  }

  addLangs(langs: string[]): void {
    this.translate.addLangs(langs);
  }

  use(lang: string): Observable<any> {
    this.languageStorage.language = lang;
    return this.translate.use(lang);
  }
}
