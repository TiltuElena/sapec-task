import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '@/shared/components/layout/sidenav/sidenav.component';
import {AdminHeaderComponent} from '@/shared/components/layout/admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, SidenavComponent, AdminHeaderComponent],
  templateUrl: './admin.component.html',
  standalone: true,
})
export class AdminComponent {
  ngOnInit() {
    document.body.classList.add('no-scroll');
  }

  ngOnDestroy() {
    document.body.classList.remove('no-scroll');
  }
}
