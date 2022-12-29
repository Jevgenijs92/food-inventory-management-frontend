import { AppTranslateService } from '@fim/core/services/app-translate.service';
import { MockService } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorageService } from '@fim/core/services/language-storage.service';
import { DateAdapter } from '@angular/material/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

describe('AppTranslateService', () => {
  let service: AppTranslateService;
  let translateService: Partial<TranslateService>;
  let languageStorageService: Partial<LanguageStorageService>;
  let dateAdapter: Partial<DateAdapter<any>>;

  beforeEach(() => {
    jest.clearAllMocks();

    translateService = MockService(TranslateService);
    languageStorageService = MockService(LanguageStorageService);
    dateAdapter = MockService(DateAdapter<any>);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useValue: translateService,
        },
        {
          provide: LanguageStorageService,
          useValue: languageStorageService,
        },
        {
          provide: DateAdapter,
          useValue: dateAdapter,
        },
        AppTranslateService,
      ],
    });

    service = TestBed.inject(AppTranslateService);
  });

  test('should create instance', () => {
    expect(service).toBeDefined();
  });

  test('should call translate service use method when init method is called ', () => {
    const spyUse = jest.spyOn(translateService, 'use');
    service.init();
    expect(spyUse).toHaveBeenCalledTimes(1);
  });

  test('should call translate service addLangs method when init method is called ', () => {
    const spyAddLangs = jest.spyOn(translateService, 'addLangs');
    service.init();
    expect(spyAddLangs).toHaveBeenCalledTimes(1);
  });

  test('should call language storage service language setter when init method is called ', () => {
    const spyLanguage = jest.spyOn(languageStorageService, 'language', 'set');
    service.init();
    expect(spyLanguage).toHaveBeenCalledTimes(1);
  });

  test('should call date adapter set locale method when init method is called', () => {
    const spySetLocale = jest.spyOn(dateAdapter, 'setLocale');
    service.init();
    expect(spySetLocale).toHaveBeenCalledTimes(1);
  });

  test('should call translate service stream method when translate method is called', () => {
    const spyStream = jest.spyOn(translateService, 'stream');
    service.translate('');
    expect(spyStream).toHaveBeenCalledTimes(1);
  });

  test('should return new language when language is changed', async () => {
    service.language = 'ja';
    const lang = await service.language$.pipe(first()).toPromise();
    expect(lang).toBe('ja');
  });
});
