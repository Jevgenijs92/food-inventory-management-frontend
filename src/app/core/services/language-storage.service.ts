import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageStorageService {
  get language(): string {
    return localStorage.getItem(LANGUAGE) ?? 'en';
  }

  set language(language: string) {
    localStorage.setItem(LANGUAGE, language);
  }
}

const LANGUAGE = 'lang';
