import { Component, ViewChild } from '@angular/core';
import { ApexTheme, ChartComponent } from 'ng-apexcharts';
import { combineLatest, map, Subscription } from 'rxjs';
import { Inventory } from '@/shared/interfaces';
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
import { InventoryDataService } from '@/modules/inventory/services/inventory-data.service';
import { ThemeService } from '@/shared/services/theme.service';

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
  theme: ApexTheme;
};

@Component({
  selector: 'app-inventory-data-chart',
  templateUrl: './inventory-data-chart.component.html',
  standalone: true,
  imports: [ChartComponent],
})
export class InventoryDataChartComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private inventorySubscription!: Subscription;

  constructor(
    private inventoryService: InventoryDataService,
    private themeService: ThemeService,
  ) {
    const storedTheme =
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

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
      theme: {
        mode: storedTheme,
      },
    };
  }

  ngOnInit(): void {
    this.inventorySubscription = combineLatest([
      this.inventoryService.inventoryData$,
      this.themeService.theme$,
    ])
      .pipe(
        map(([inventory, theme]) => this.buildChartOptions(inventory, theme)),
      )
      .subscribe((options) => {
        this.chartOptions = options;
        this.chart?.updateOptions(options);
        this.chart?.updateSeries(options.series);
      });
  }

  ngOnDestroy(): void {
    this.inventorySubscription?.unsubscribe();
  }

  private buildChartOptions(
    data: Inventory[],
    theme: 'light' | 'dark',
  ): ChartOptions {
    const stockByCategory: Record<string, number> = {};

    data.forEach((item) => {
      stockByCategory[item.category] =
        (stockByCategory[item.category] || 0) + Number(item.stockCount);
    });

    const categories = Object.keys(stockByCategory);
    const stockValues = Object.values(stockByCategory);

    const labelColor = theme === 'dark' ? '#fff' : '#000';

    return {
      series: [
        {
          name: 'Stock Count',
          data: stockValues,
        },
      ],
      chart: {
        type: 'bar',
        height: 400,
      },
      title: {
        text: 'Stock Count by Category',
        align: 'left',
        style: {
          color: labelColor,
        },
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
        categories,
        title: {
          text: 'Stock Count',
        },
        labels: {
          style: {
            colors: [labelColor],
          },
        },
      },
      yaxis: {
        title: {
          text: 'Category',
        },
        labels: {
          style: {
            colors: [labelColor],
          },
        },
      },
      theme: {
        mode: theme,
      },
    };
  }
}
