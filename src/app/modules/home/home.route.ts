import { Routes } from '@angular/router';

export const homeRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },
];
