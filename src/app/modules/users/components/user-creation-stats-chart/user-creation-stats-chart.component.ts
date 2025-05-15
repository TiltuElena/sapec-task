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
import { User } from '@/shared/interfaces';
import { combineLatest, map, Subscription } from 'rxjs';
import { ThemeService } from '@/shared/services/theme.service';

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
        zoom: {enabled: false},
      },
      title: {
        text: 'User Creation Time',
        align: 'left',
      },
      xaxis: {
        labels: {
          showDuplicates: true,
          hideOverlappingLabels: false,
          trim: false,
          rotate: -45,
          style: {
            fontSize: '12px',
          },
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
        map(([users, theme]) => this.buildChartOptions(users, theme)),
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

  private buildChartOptions(
    users: User[],
    theme: 'light' | 'dark',
  ): ChartOptions {
    const isDark = theme === 'dark';
    const labelColor = theme === 'dark' ? '#fff' : '#000';
    // const startColor = isDark ? '#3b82f6' : '#60a5fa';
    // const endColor = isDark ? '#1e3a8a' : '#3b82f6';
    const endColor = isDark ? '#000' : '#fff';

    const creationDateCounts: { [date: string]: number } = {};
    users.forEach((user) => {
      const dateStr = user.creationTime.toISOString().split('T')[0];
      creationDateCounts[dateStr] =
        (creationDateCounts[dateStr] || 0) + 1;
    });

    const dates = Object.keys(creationDateCounts).sort();
    const userCounts = dates.map((d) => creationDateCounts[d]);

    const formattedDates = dates.map((dateStr) => {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }).format(date);
    });

    return {
      ...this.chartOptions,
      series: [
        {
          name: 'Users Created',
          data: userCounts,
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        type: 'category',
        categories: formattedDates,
        labels: {
          ...this.chartOptions.xaxis.labels,
          style: {colors: labelColor},
        },
        axisBorder: {color: labelColor},
        axisTicks: {color: labelColor},
      },
      yaxis: {
        ...this.chartOptions.yaxis,
        max: Math.max(...userCounts) + 2,
        labels: {
          style: {colors: labelColor},
        },
      },
      title: {
        ...this.chartOptions.title,
        style: {color: labelColor},
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
}
