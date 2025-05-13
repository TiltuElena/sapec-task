import { Component } from '@angular/core';
import { Route } from '@/ts/interfaces';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUserRound, lucidePackage, lucideLogOut } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { AuthService } from '@/services/auth.service';
import { PageRoutes } from '@/ts/enums';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, NgIcon, HlmIconDirective, RouterLinkActive],
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
