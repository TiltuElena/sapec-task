import { Component } from '@angular/core';
import { InventoryDataTableComponent } from '@/pages/inventory/inventory-data-table/inventory-data-table.component';
import { InventoryDataChartComponent } from '@/pages/inventory/inventory-data-chart/inventory-data-chart.component';

@Component({
  selector: 'app-inventory',
  imports: [InventoryDataTableComponent, InventoryDataChartComponent],
  templateUrl: './inventory.component.html',
  standalone: true,
})
export class InventoryComponent {}
