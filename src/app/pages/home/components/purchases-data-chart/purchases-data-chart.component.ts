import { Component, ViewChild } from '@angular/core';
import { PurchasesDataService } from '@/pages/purchases/services/purchases-data.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Purchase } from '@/ts/interfaces';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { DeliveryStatus } from '@/ts/enums';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  fill: ApexFill;
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

  constructor(private purchasesDataService: PurchasesDataService) {
    this.purchasesData$ = this.purchasesDataService.purchasesData$;

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
    };
  }

  ngOnInit(): void {
    this.purchasesDataSubscription =
      this.purchasesDataService.purchasesData$.subscribe(
        (purchases: Purchase[]) => {
          this.processUserDataForPieChart(purchases);
        },
      );
  }

  ngOnDestroy(): void {
    if (this.purchasesDataSubscription) {
      this.purchasesDataSubscription.unsubscribe();
    }
  }

  private processUserDataForPieChart(purchases: Purchase[]): void {
    const statusCounts: { [key: string]: number } = {
      [DeliveryStatus.PENDING]: 0,
      [DeliveryStatus.CANCELLED]: 0,
      [DeliveryStatus.DELIVERED]: 0,
    };

    purchases.forEach((purchase) => {
      if (purchase.deliveryStatus === DeliveryStatus.PENDING) {
        statusCounts[DeliveryStatus.PENDING] += 1;
      } else if (purchase.deliveryStatus === DeliveryStatus.CANCELLED) {
        statusCounts[DeliveryStatus.CANCELLED] += 1;
      } else if (purchase.deliveryStatus === DeliveryStatus.DELIVERED) {
        statusCounts[DeliveryStatus.DELIVERED] += 1;
      }
    });

    this.chartOptions.series = Object.values(statusCounts);
    this.chartOptions.labels = ['Delivered', 'Pending', 'Canceled'];

    this.chartOptions.fill.colors = this.chartOptions.labels.map(
      (label: any) => {
        if (label === 'Delivered') {
          return '#12b76a';
        } else if (label === 'Pending') {
          return '#FFEE8A';
        } else if (label === 'Canceled') {
          return '#ff6666';
        } else {
          return '#ccc';
        }
      },
    );

    // Update the chart with the new data
    if (this.chart) {
      this.chart.updateSeries(this.chartOptions.series);
      this.chart.updateOptions({ labels: this.chartOptions.labels });
    }
  }
}
