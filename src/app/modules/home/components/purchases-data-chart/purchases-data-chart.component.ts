import { Component, ViewChild } from '@angular/core';
import { PurchasesDataService } from '@/modules/purchases/services/purchases-data.service';
import { BehaviorSubject, combineLatest, map, Subscription } from 'rxjs';
import { Purchase } from '@/shared/interfaces';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexTheme,
  ChartComponent,
} from 'ng-apexcharts';
import { DeliveryStatus } from '@/shared/enums';
import { ThemeService } from '@/shared/services/theme.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  theme: ApexTheme;
};

@Component({
  selector: 'app-purchases-data-chart',
  imports: [ChartComponent],
  templateUrl: './purchases-data-chart.component.html',
  standalone: true,
})
export class PurchasesDataChartComponent {
  purchasesData$ = new BehaviorSubject<Purchase[]>([]);
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private purchasesDataSubscription!: Subscription;

  constructor(
    private purchasesDataService: PurchasesDataService,
    private themeService: ThemeService,
  ) {
    this.purchasesData$ = this.purchasesDataService.purchasesData$;
    const storedTheme =
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

    this.chartOptions = {
      series: [],
      chart: {
        height: '350px',
        width: '500px',
        type: 'donut',
      },
      labels: [],
      title: {
        text: 'Delivery Status',
        align: 'left',
      },
      fill: {
        colors: [],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      theme: {
        mode: storedTheme,
      },
    };
  }

  ngOnInit(): void {
    this.purchasesDataSubscription = combineLatest([
      this.purchasesDataService.purchasesData$,
      this.themeService.theme$,
    ])
      .pipe(
        map(([purchases, theme]) => this.buildChartOptions(purchases, theme)),
      )
      .subscribe((options) => {
        this.chartOptions = options;
        this.chart?.updateOptions(options);
        this.chart?.updateSeries(options.series);
      });
  }

  ngOnDestroy(): void {
    if (this.purchasesDataSubscription) {
      this.purchasesDataSubscription.unsubscribe();
    }
  }

  private buildChartOptions(
    purchases: Purchase[],
    theme: 'light' | 'dark',
  ): ChartOptions {
    const statusCounts: { [key: string]: number } = {
      [DeliveryStatus.PENDING]: 0,
      [DeliveryStatus.CANCELLED]: 0,
      [DeliveryStatus.DELIVERED]: 0,
    };

    purchases.forEach((purchase) => {
      statusCounts[purchase.deliveryStatus] =
        (statusCounts[purchase.deliveryStatus] || 0) + 1;
    });

    const labels = ['Delivered', 'Pending', 'Canceled'];
    const series = [
      statusCounts[DeliveryStatus.DELIVERED] || 0,
      statusCounts[DeliveryStatus.PENDING] || 0,
      statusCounts[DeliveryStatus.CANCELLED] || 0,
    ];

    const fillColors = labels.map((label) => {
      switch (label) {
        case 'Delivered':
          return '#12b76a';
        case 'Pending':
          return '#FFEE8A';
        case 'Canceled':
          return '#ff6666';
        default:
          return '#ccc';
      }
    });

    const labelColor = theme === 'dark' ? '#fff' : '#000';

    return {
      series,
      chart: {
        height: '350px',
        width: '500px',
        type: 'donut',
      },
      labels,
      title: {
        text: 'Delivery Status',
        align: 'left',
        style: {
          color: labelColor,
        },
      },
      fill: {
        colors: fillColors,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      theme: {
        mode: theme,
      },
    };
  }
}
