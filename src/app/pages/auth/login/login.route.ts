import { Routes } from '@angular/router';

export const loginRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
];
