import { Component } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@/shared/components/libs/ui/ui-menu-helm/src';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemDirective,
    HlmMenuGroupComponent,
    TranslatePipe,
  ],
  templateUrl: './language-switch.component.html',
  standalone: true,
})
export class LanguageSwitchComponent {
  languages = [
    {
      label: 'EN',
      value: 'en',
      icon: 'assets/images/uk-flag.png',
    },
    {
      label: 'RO',
      value: 'ro',
      icon: 'assets/images/ro-flag.png',
    },
  ];

  selectedLang = this.languages[0];

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';

    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);

    this.setSelectedLang(savedLang);
  }

  switchLanguage(langCode: string) {
    this.translate.use(langCode);
    localStorage.setItem('lang', langCode);
    this.setSelectedLang(langCode);
  }

  private setSelectedLang(langCode: string) {
    const found = this.languages.find((l) => l.value === langCode);
    if (found) this.selectedLang = found;
  }
}
