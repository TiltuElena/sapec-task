import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '@/shared/components/confirm-dialog/confirm-dialog.component';
import { HlmToasterComponent } from '@/shared/components/libs/ui/ui-sonner-helm/src';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmDialogComponent, HlmToasterComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  title = 'sapec-task';

  throwError() {
    throw new Error('Standalone component error!');
  }
}
