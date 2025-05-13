import { Component } from '@angular/core';
import { Route } from '@/ts/interfaces';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { AuthService } from '@/services/auth.service';
import { PageRoutes } from '@/ts/enums';

@Component({
  selector: 'app-header',
    imports: [RouterLink, HlmIconDirective, NgIcon, RouterLinkActive],
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
