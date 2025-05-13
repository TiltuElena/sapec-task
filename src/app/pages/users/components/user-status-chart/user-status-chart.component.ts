import { Component, ViewChild } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';
import { ChartComponent } from 'ng-apexcharts';
import { User } from '@/ts/interfaces';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexFill
} from 'ng-apexcharts';
import { UserStatus } from '@/ts/enums';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  fill: ApexFill;
};
@Component({
  selector: 'app-user-status-chart',
  imports: [ChartComponent],
  templateUrl: './user-status-chart.component.html',
  standalone: true,
})
export class UserStatusChartComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private userDataSubscription!: Subscription;

  constructor(private userDataService: UserDataService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: '80%',
        height: 'auto',
        type: 'donut',
      },
      labels: [],
      title: {
        text: 'User Status',
        align: 'left',
      },
      fill: {
        colors: []
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
    this.userDataSubscription = this.userDataService.userData$.subscribe(
      (users: User[]) => {
        this.processUserDataForPieChart(users);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  private processUserDataForPieChart(users: User[]): void {
    const statusCounts: { [key: string]: number } = {
      [UserStatus.ACTIVE]: 0,
      [UserStatus.INACTIVE]: 0,
    };

    // Count users based on their status
    users.forEach((user) => {
      if (user.status === UserStatus.ACTIVE) {
        statusCounts[UserStatus.ACTIVE] += 1;
      } else if (user.status === UserStatus.INACTIVE) {
        statusCounts[UserStatus.INACTIVE] += 1;
      }
    });

    // Prepare the chart series and labels
    this.chartOptions.series = Object.values(statusCounts);
    this.chartOptions.labels = [
      'Active', // Label for ACTIVE status
      'Inactive', // Label for INACTIVE status
    ];

    this.chartOptions.fill.colors = this.chartOptions.labels.map((label: any) => {
      if (label === 'Active') {
        return '#12b76a';
      } else if (label === 'Inactive') {
        return '#ff6384';
      } else {
        return '#ccc';
      }
    });

    // Update the chart with the new data
    if (this.chart) {
      this.chart.updateSeries(this.chartOptions.series);
      this.chart.updateOptions({ labels: this.chartOptions.labels });
    }
  }
}
