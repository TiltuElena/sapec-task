import { Component } from '@angular/core';
import { Route } from '../../../interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUserRound, lucidePackage, lucideLogOut } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { AuthService } from '@/core/services/auth.service';
import { PageRoutes } from '../../../enums';
import { ThemeToggleComponent } from '@/shared/components/theme-toggle/theme-toggle.component';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import {HlmCardDirective} from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterLink,
    NgIcon,
    HlmIconDirective,
    RouterLinkActive,
    ThemeToggleComponent,
    HlmSeparatorDirective,
    HlmCardDirective,
  ],
  templateUrl: './sidenav.component.html',
  providers: [provideIcons({ lucideUserRound, lucidePackage, lucideLogOut })],
  standalone: true,
})
export class SidenavComponent {
  constructor(private authService: AuthService) {}

  routes: Route[] = [
    {
      title: 'Users',
      link: PageRoutes.USERS,
      icon: 'lucideUserRound',
    },
    {
      title: 'Inventory',
      link: PageRoutes.INVENTORY,
      icon: 'lucidePackage',
    },
  ];

  logout() {
    this.authService.logout();
  }
}
