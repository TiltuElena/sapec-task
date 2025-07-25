import { Component } from '@angular/core';
import {
  HlmCardContentDirective, HlmCardDirective,
  HlmCardTitleDirective,
} from '@/shared/components/libs/ui/ui-card-helm/src';
import { HlmLabelDirective } from '@/shared/components/libs/ui/ui-label-helm/src';
import { HlmInputDirective } from '@/shared/components/libs/ui/ui-input-helm/src';
import { HlmButtonDirective } from '@/shared/components/libs/ui/ui-button-helm/src';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '@/core/services/auth.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    NgClass,
    HlmCardDirective,
  ],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userEmail = this.loginForm.getRawValue().email;
      const userPassword = this.loginForm.getRawValue().password;

      if (this.authService.login(userEmail, userPassword)) {
        this.toastService.showSuccessToast('Success', 'Successfully logged in');
      } else {
        this.loginForm.reset();
        this.toastService.showSuccessToast('Success','Incorrect credentials');
      }
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
