import { Component } from '@angular/core';
import { ThemeService } from '@/shared/services/theme.service';
import {HlmSwitchModule} from '@spartan-ng/ui-switch-helm';
import {HlmLabelDirective} from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    HlmSwitchModule,
    HlmLabelDirective
  ],
  templateUrl: './theme-toggle.component.html',
  standalone: true,
})
export class ThemeToggleComponent {
  isDarkMode: boolean = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode ? 'dark' : 'light');
  }

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.getTheme() === 'dark';
  }
}
