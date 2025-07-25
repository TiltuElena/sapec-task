import { Component } from '@angular/core';
import { ThemeService } from '@/shared/services/theme.service';
import { HlmSwitchModule } from '@/shared/components/libs/ui/ui-switch-helm/src';
import { HlmLabelDirective } from '@/shared/components/libs/ui/ui-label-helm/src';

@Component({
  selector: 'app-theme-toggle',
  imports: [HlmSwitchModule, HlmLabelDirective],
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
