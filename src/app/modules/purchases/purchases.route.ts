import { Routes } from '@angular/router';

export const purchasesRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./purchases.component').then((m) => m.PurchasesComponent),
  },
];
