import { Component, ViewChild } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { combineLatest, map, Subscription } from 'rxjs';
import { ChartComponent } from 'ng-apexcharts';
import { User } from '@/shared/interfaces';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexFill,
  ApexTheme,
} from 'ng-apexcharts';
import { UserStatus } from '@/shared/enums';
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
  selector: 'app-user-status-chart',
  imports: [ChartComponent],
  templateUrl: './user-status-chart.component.html',
  standalone: true,
})
export class UserStatusChartComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;
  private userDataSubscription!: Subscription;

  constructor(
    private userDataService: UserDataService,
    private themeService: ThemeService,
  ) {
    const storedTheme =
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

    this.chartOptions = {
      series: [],
      chart: {
        height: '320px',
        type: 'donut',
      },
      labels: [],
      title: {
        text: 'User Status',
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
    this.userDataSubscription = combineLatest([
      this.userDataService.userData$,
      this.themeService.theme$,
    ])
      .pipe(
        map(([users, theme]) => this.processUserDataForPieChart(users, theme)),
      )
      .subscribe((options) => {
        this.chartOptions = options;
        this.chart?.updateOptions(this.chartOptions);
      });
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  private processUserDataForPieChart(
    users: User[],
    theme: 'light' | 'dark',
  ): any {
    const statusCounts: { [key: string]: number } = {
      [UserStatus.ACTIVE]: 0,
      [UserStatus.INACTIVE]: 0,
    };

    const labelColor = theme === 'dark' ? '#fff' : '#000';

    users.forEach((user) => {
      if (user.status === UserStatus.ACTIVE) {
        statusCounts[UserStatus.ACTIVE] += 1;
      } else if (user.status === UserStatus.INACTIVE) {
        statusCounts[UserStatus.INACTIVE] += 1;
      }
    });

    const labels = ['Active', 'Inactive'];
    const colors = labels.map((label) => {
      if (label === 'Active') return '#12b76a';
      if (label === 'Inactive') return '#ff6384';
      return '#ccc';
    });

    return {
      ...this.chartOptions,
      series: Object.values(statusCounts),
      labels,
      fill: {
        colors,
      },
      title: {
        ...this.chartOptions.title,
        style: {
          color: labelColor,
        },
      },
      theme: {
        mode: theme,
      },
      legend: {
        labels: {
          colors: [labelColor],
        },
      },
    };
  }
}
