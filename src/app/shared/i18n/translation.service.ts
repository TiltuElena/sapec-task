import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_translations } from '@/shared/i18n/translations/en';
import { ro_translations } from '@/shared/i18n/translations/ro';
type SupportedLang = 'en' | 'ro';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = {
    en: en_translations,
    ro: ro_translations,
  };

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang');
    const defaultLang: SupportedLang = this.isSupportedLang(savedLang) ? savedLang : 'ro';

    this.translate.addLangs(Object.keys(this.translations) as SupportedLang[]);
    this.translate.setDefaultLang(defaultLang);
    this.loadLanguage(defaultLang);
  }

  private isSupportedLang(lang: any): lang is SupportedLang {
    return Object.keys(this.translations).includes(lang);
  }

  loadLanguage(lang: SupportedLang) {
    this.translate.setTranslation(lang, this.translations[lang], true);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  switch(lang: string) {
    if (this.isSupportedLang(lang)) {
      this.loadLanguage(lang);
    }
  }

  currentLang(): SupportedLang {
    const current = this.translate.currentLang;
    return this.isSupportedLang(current) ? current : 'ro';
  }
}
