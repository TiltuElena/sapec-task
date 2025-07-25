import { Component } from '@angular/core';
import { LanguageSwitchComponent } from '@/shared/components/language-switch/language-switch.component';
import { ThemeToggleComponent } from '@/shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-header',
  imports: [LanguageSwitchComponent, ThemeToggleComponent],
  templateUrl: './admin-header.component.html',
  standalone: true,
})
export class AdminHeaderComponent {}
