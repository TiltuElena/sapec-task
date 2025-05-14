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
import { combineLatest, map, Subscription } from 'rxjs';
import { ThemeService } from '@/services/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  theme: ApexTheme;
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

  constructor(
    private userDataService: UserDataService,
    private themeService: ThemeService,
  ) {
    const storedTheme =
      localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';

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
      theme: {
        mode: storedTheme,
        palette: 'palette2',
        monochrome: {
          enabled: false,
          shadeTo: storedTheme,
          shadeIntensity: 0.65,
        },
      },
    };
  }

  ngOnInit(): void {
    this.userDataSubscription = combineLatest([
      this.userDataService.userData$,
      this.themeService.theme$,
    ])
      .pipe(
        map(([users, theme]) => {
          const chartOptions = this.buildFullChartOptions(users, theme);
          return chartOptions;
        }),
      )
      .subscribe((options) => {
        this.chartOptions = options;
        this.chart?.updateOptions(this.chartOptions);
      });
  }

  private buildFullChartOptions(
    users: User[],
    theme: 'dark' | 'light',
  ): ChartOptions {
    const isDark = theme === 'dark';
    const labelColor = isDark ? '#fff' : '#000';
    // const startColor = isDark ? '#3b82f6' : '#60a5fa';
    // const endColor = isDark ? '#1e3a8a' : '#3b82f6';
    const endColor = isDark ? '#000' : '#fff';

    const creationDateCounts: { [date: string]: number } = {};
    const sortedUsers = [...users].sort(
      (a, b) => a.creationTime.getTime() - b.creationTime.getTime(),
    );

    sortedUsers.forEach((user) => {
      const creationDate = user.creationTime.toISOString().split('T')[0];
      creationDateCounts[creationDate] =
        (creationDateCounts[creationDate] || 0) + 1;
    });

    const dates = Object.keys(creationDateCounts).sort();
    const userCounts = dates.map((date) => creationDateCounts[date]);

    const dailyCounts: { [timestamp: number]: number } = {};
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

    const maxY = Math.max(...seriesData.map((data) => data.y)) + 2;

    return {
      series: [
        {
          name: 'Users Created',
          data: userCounts,
        },
      ],
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
        style: { color: labelColor },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM yy',
          style: { colors: labelColor },
        },
        axisBorder: { color: labelColor },
        axisTicks: { color: labelColor },
        categories: dates,
      },
      yaxis: {
        min: 0,
        max: maxY,
        forceNiceScale: true,
        labels: {
          style: { colors: labelColor },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
          gradientToColors: [endColor],
          colorStops: [],
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      theme: {
        mode: theme,
        palette: 'palette2',
        monochrome: {
          enabled: false,
          shadeTo: theme,
          shadeIntensity: 0.65,
        },
      },
    };
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
