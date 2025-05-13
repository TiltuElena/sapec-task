import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmDialogComponent, HlmToasterComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  title = 'sapec-task';
}
