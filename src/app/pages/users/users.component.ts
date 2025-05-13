import { Component } from '@angular/core';
import { UserCreationStatsChartComponent } from './components/user-creation-stats-chart/user-creation-stats-chart.component';
import { UserStatusChartComponent } from './components/user-status-chart/user-status-chart.component';
import { UserTableTestComponent } from '@/pages/users/components/user-table-test/user-table-test.component';

@Component({
  selector: 'app-users',
  imports: [
    UserCreationStatsChartComponent,
    UserStatusChartComponent,
    UserTableTestComponent,
  ],
  templateUrl: './users.component.html',
  standalone: true,
})
export class UsersComponent {}
