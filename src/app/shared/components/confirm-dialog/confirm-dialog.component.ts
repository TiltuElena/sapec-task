import { Component, Input } from '@angular/core';
import { HlmAlertDialogModule } from '@/shared/components/libs/ui/ui-alertdialog-helm/src';
import { BrnAlertDialogContentDirective } from '@spartan-ng/brain/alert-dialog';
import { HlmButtonDirective } from '@/shared/components/libs/ui/ui-button-helm/src';
import { HlmDialogModule } from '@/shared/components/libs/ui/ui-dialog-helm/src';
import { ConfirmDialogService } from '@/shared/services/confirm-dialog.service';

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
