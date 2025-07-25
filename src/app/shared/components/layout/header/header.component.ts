import { Component } from '@angular/core';
import { Route } from '@/shared/interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { HlmIconDirective } from '@/shared/components/libs/ui/ui-icon-helm/src';
import { AuthService } from '@/core/services/auth.service';
import { PageRoutes } from '@/shared/enums';
import { ThemeToggleComponent } from '@/shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    HlmIconDirective,
    NgIcon,
    RouterLinkActive,
    ThemeToggleComponent,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  routes: Route[] = [
    {
      title: 'Home',
      link: PageRoutes.HOME,
    },
    {
      title: 'Purchases',
      link: PageRoutes.PURCHASES,
    },
  ];

  logout() {
    this.authService.logout();
  }
}
