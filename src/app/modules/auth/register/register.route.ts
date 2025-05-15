import { Routes } from '@angular/router';

export const registerRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./register.component').then((m) => m.RegisterComponent),
  },
];
