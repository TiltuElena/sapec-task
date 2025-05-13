import { Component, ViewChild } from '@angular/core';
import { ApexStroke, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartType,
  ApexDataLabels,
} from 'ng-apexcharts';
import { UserDataService } from '../../services/user-data.service';
import { User } from '@/ts/interfaces';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-user-creation-stats-chart',
  imports: [NgApexchartsModule],
  templateUrl: './user-creation-stats-chart.component.html',
  standalone: true,
})
export class UserCreationStatsChartComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private userDataSubscription!: Subscription;

  constructor(private userDataService: UserDataService) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 'auto',
        width: '100%',
        type: 'area',
        toolbar: {
          show: true,
          tools: {
            download: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: 'User Creation Time',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM yy',
        },
      },
      yaxis: {
        min: 0,
        forceNiceScale: true,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
    };
  }

  ngOnInit(): void {
    this.userDataSubscription = this.userDataService.userData$.subscribe(
      (users: User[]) => {
        this.processUserDataForChart(users);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  private processUserDataForChart(users: User[]): void {
    const sortedUsers = [...users].sort(
      (a, b) => a.creationTime.getTime() - b.creationTime.getTime(),
    );

    const creationDateCounts: { [date: string]: number } = {};
    sortedUsers.forEach((user) => {
      const creationDate = user.creationTime.toISOString().split('T')[0];
      creationDateCounts[creationDate] =
        (creationDateCounts[creationDate] || 0) + 1;
    });

    const dates = Object.keys(creationDateCounts).sort();
    const userCounts = dates.map((date) => creationDateCounts[date]);
    const dailyCounts: { [date: number]: number } = {};

    sortedUsers.forEach((user) => {

      const startOfDay = new Date(
        Date.UTC(
          user.creationTime.getUTCFullYear(),
          user.creationTime.getUTCMonth(),
          user.creationTime.getUTCDate(),
        ),
      ).getTime();
      dailyCounts[startOfDay] = (dailyCounts[startOfDay] || 0) + 1;
    });

    const seriesData = Object.entries(dailyCounts)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([timestamp, count]) => ({
        x: Number(timestamp),
        y: count,
      }));

    this.chartOptions.series = [
      {
        name: 'Users Created',
        data: userCounts,
      },
    ];

    this.chartOptions.xaxis = {
      categories: dates,
    };

    this.chartOptions.yaxis = {
      ...this.chartOptions.yaxis,
      max: Math.max(...seriesData.map((data) => data.y)) + 2,
    };

    if (this.chart) {
      this.chart.render();
    }
  }
}
