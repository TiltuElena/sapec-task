import { Component, Input } from '@angular/core';
import { HlmAlertDialogModule } from '@spartan-ng/ui-alertdialog-helm';
import { BrnAlertDialogContentDirective } from '@spartan-ng/brain/alert-dialog';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { ConfirmDialogService } from '@/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    HlmAlertDialogModule,
    BrnAlertDialogContentDirective,
    HlmButtonDirective,
    HlmDialogModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
})
export class ConfirmDialogComponent {
  @Input() title = 'Are you sure?';
  @Input() description = 'This action cannot be undone.';
  constructor(public dialogState: ConfirmDialogService) {}

  confirm() {
    this.dialogState.resolve(true);
  }

  cancel() {
    this.dialogState.resolve(false);
  }
}
