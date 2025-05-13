import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';

import { Inventory } from '@/ts/interfaces';

import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexFill,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
} from 'ng-apexcharts';
import { InventoryDataService } from '@/pages/inventory/services/inventory-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-inventory-data-chart',
  templateUrl: './inventory-data-chart.component.html',
  standalone: true,
  imports: [ChartComponent],
})
export class InventoryDataChartComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private inventorySubscription!: Subscription;

  constructor(private inventoryService: InventoryDataService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 400,
      },
      title: {
        text: 'Stock Count by Category',
        align: 'left',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Stock Count',
        },
      },
      yaxis: {
        title: {
          text: 'Category',
        },
      },
    };
  }

  ngOnInit(): void {
    this.inventorySubscription = this.inventoryService.inventoryData$.subscribe(
      (data: Inventory[]) => this.prepareChartData(data),
    );
  }

  ngOnDestroy(): void {
    this.inventorySubscription?.unsubscribe();
  }

  private prepareChartData(data: Inventory[]): void {
    const stockByCategory: Record<string, number> = {};

    data.forEach((item) => {
      stockByCategory[item.category] =
        (stockByCategory[item.category] || 0) + Number(item.stockCount);
    });

    const categories = Object.keys(stockByCategory);
    const stockValues = Object.values(stockByCategory);

    this.chartOptions.series = [
      {
        name: 'Stock Count',
        data: stockValues,
      },
    ];

    this.chartOptions.xaxis = { ...this.chartOptions.xaxis, categories };
    if (this.chart) {
      this.chart.render();
    }
  }
}
