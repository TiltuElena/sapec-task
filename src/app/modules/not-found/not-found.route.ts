import { Routes } from '@angular/router';

export const notFoundRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./not-found.component').then((m) => m.NotFoundComponent),
  },
];
