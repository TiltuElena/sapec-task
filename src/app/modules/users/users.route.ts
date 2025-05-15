import { Routes } from '@angular/router';

export const usersRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((m) => m.UsersComponent),
  },
];
