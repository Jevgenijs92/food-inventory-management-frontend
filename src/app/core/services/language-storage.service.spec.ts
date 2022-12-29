import { LanguageStorageService } from '@fim/core/services/language-storage.service';

describe('LanguageStorageService', function () {
  let service: LanguageStorageService;
  const languageKey = 'lang';

  beforeEach(() => {
    service = new LanguageStorageService();
    localStorage.clear();
  });

  test('should set language in local storage as lang property', () => {
    const language = 'lv';
    service.language = language;
    const lang = localStorage.getItem(languageKey);
    expect(lang).toEqual(language);
  });

  test('should retrieve language from local storage', () => {
    const language = 'ja';
    localStorage.setItem(languageKey, language);
    expect(service.language).toEqual(language);
  });

  test('should return english when no language is set in storage', () => {
    expect(service.language).toEqual('en');
  });
});
