import { Route } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { UserRole } from '@/ts/enums';

export const routes: Route[] = [
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: UserRole.ADMIN },
    loadComponent: () =>
      import('./layouts/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.route').then((m) => m.usersRoute),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./pages/inventory/inventory.route').then(
            (m) => m.inventoryRoute,
          ),
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'user',
    canActivate: [authGuard],
    data: { role: UserRole.USER },
    loadComponent: () =>
      import('./layouts/user/user.component').then((m) => m.UserComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.route').then((m) => m.homeRoute),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('./pages/purchases/purchases.route').then(
            (m) => m.purchasesRoute,
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.route').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.route').then((m) => m.notFoundRoute),
  },
];
