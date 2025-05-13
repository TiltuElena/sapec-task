import { Component } from '@angular/core';
import { InventoryDataTableComponent } from '@/pages/inventory/inventory-data-table/inventory-data-table.component';

@Component({
  selector: 'app-inventory',
  imports: [InventoryDataTableComponent],
  templateUrl: './inventory.component.html',
  standalone: true,
})
export class InventoryComponent {}
