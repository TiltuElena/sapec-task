import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/components/layout/header/header.component';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './user.component.html',
  standalone: true,
})
export class UserComponent {}
