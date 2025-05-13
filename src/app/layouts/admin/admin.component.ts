import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '@/components/layout/sidenav/sidenav.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './admin.component.html',
  standalone: true,
})
export class AdminComponent {}
