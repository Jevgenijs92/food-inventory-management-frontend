import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorageService } from '@fim/core/services/language-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  constructor(
    protected translateService: TranslateService,
    protected languageStorage: LanguageStorageService,
    protected dateAdapter: DateAdapter<any>
  ) {}

  languages = ['en', 'ru', 'lv'];
  locales = new Map([
    ['en', 'en-US'],
    ['ru', 'ru'],
    ['lv', 'lv'],
  ]);

  private _language: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.languageStorage.language
  );

  language$: Observable<string> = this._language
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  set language(lang: string) {
    this.use(lang);
    this._language.next(lang);
  }

  init(): void {
    this.use(this._language.value);
    this.translateService.addLangs(this.languages);
  }

  translate(
    key: string | string[],
    interpolateParams?: Object | undefined
  ): Observable<any> {
    return this.translateService.stream(key, interpolateParams);
  }

  private use(lang: string): Observable<any> {
    this.languageStorage.language = lang;
    this.dateAdapter.setLocale(this.locales.get(lang));
    return this.translateService.use(lang);
  }
}
