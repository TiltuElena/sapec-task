import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmDialogModule } from '@/shared/components/libs/ui/ui-dialog-helm/src';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { HlmButtonDirective } from '@/shared/components/libs/ui/ui-button-helm/src';
import { HlmLabelDirective } from '@/shared/components/libs/ui/ui-label-helm/src';
import { HlmInputDirective } from '@/shared/components/libs/ui/ui-input-helm/src';
import { HlmDatePickerModule } from '@/shared/components/libs/ui/ui-datepicker-helm/src';
import { HlmAlertDialogModule } from '@/shared/components/libs/ui/ui-alertdialog-helm/src';
import { DatePicker } from 'primeng/datepicker';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectModule } from '@/shared/components/libs/ui/ui-select-helm/src';
import { User } from '@/shared/interfaces';

@Component({
  selector: 'app-user-dialog',
  imports: [
    HlmDialogModule,
    HlmButtonDirective,
    HlmLabelDirective,
    HlmInputDirective,
    ReactiveFormsModule,
    HlmDatePickerModule,
    HlmAlertDialogModule,
    DatePicker,
    BrnSelectImports,
    HlmSelectModule,
  ],
  templateUrl: './user-dialog.component.html',
  standalone: true,
})
export class UserDialogComponent {
  userForm: FormGroup;
  isEditMode = false;

  userStatusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  userRoleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  private readonly context = injectBrnDialogContext<{ user?: User }>();

  constructor(
    private fb: FormBuilder,
    private readonly dialogRef: BrnDialogRef<User>,
  ) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      creationTime: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const user = this.context.user;

    if (user) {
      this.isEditMode = true;
      this.userForm.patchValue(user);

      const roleOption = this.userRoleOptions.find(
        (option) => option.value === user.role,
      );

      if (roleOption) {
        this.userForm.patchValue({ role: roleOption });
      }

      const statusOption = this.userStatusOptions.find(
        (option) => option.value === user.status,
      );
      if (statusOption) {
        this.userForm.patchValue({ status: statusOption });
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValues = this.userForm.getRawValue();
      const result = {
        ...this.context.user,
        ...formValues,
        role: formValues.role?.value || formValues.role,
        status: formValues.status?.value || formValues.status,
      };
      this.dialogRef.close(result);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
