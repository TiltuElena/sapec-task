import { Component } from '@angular/core';
import { Route } from '../../../interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUserRound, lucidePackage, lucideLogOut } from '@ng-icons/lucide';
import { HlmIconDirective } from '@/shared/components/libs/ui/ui-icon-helm/src';
import { AuthService } from '@/core/services/auth.service';
import { PageRoutes } from '../../../enums';
import { HlmSeparatorDirective } from '@/shared/components/libs/ui/ui-separator-helm/src';
import { HlmCardDirective } from '@/shared/components/libs/ui/ui-card-helm/src';

@Component({
  selector: 'app-sidenav',
  imports: [
    RouterLink,
    NgIcon,
    HlmIconDirective,
    RouterLinkActive,
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
