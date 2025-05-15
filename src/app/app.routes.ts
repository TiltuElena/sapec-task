import { Route } from '@angular/router';
import { authGuard } from '@/core/guards/auth.guard';
import { UserRole } from '@/shared/enums';

export const routes: Route[] = [
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { role: UserRole.ADMIN },
    loadComponent: () =>
      import('@/core/layouts/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@/modules/users/users.route').then((m) => m.usersRoute),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('@/modules/inventory/inventory.route').then(
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
      import('@/core/layouts/user/user.component').then((m) => m.UserComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@/modules/home/home.route').then((m) => m.homeRoute),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('@/modules/purchases/purchases.route').then(
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
      import('@/core/layouts/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@/modules/auth/auth.route').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: '**',
    loadChildren: () =>
      import('@/modules/not-found/not-found.route').then((m) => m.notFoundRoute),
  },
];
