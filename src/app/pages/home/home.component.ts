import { Component } from '@angular/core';
import { DataOverviewComponent } from '@/pages/home/components/data-overview/data-overview.component';
import {PurchasesDataChartComponent} from '@/pages/home/components/purchases-data-chart/purchases-data-chart.component';

@Component({
  selector: 'app-home',
  imports: [DataOverviewComponent, PurchasesDataChartComponent],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent {}
