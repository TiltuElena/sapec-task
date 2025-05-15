import { Routes } from '@angular/router';

export const inventoryRoute: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./inventory.component').then((m) => m.InventoryComponent),
  },
];
