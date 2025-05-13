import { Component } from '@angular/core';
import {
  HlmCardContentDirective, HlmCardDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '@/services/auth.service';
import { ToastService } from '@/services/toast.service';

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
        this.toastService.showSimpleToast('Successfully logged in');
      } else {
        this.loginForm.reset();
        this.toastService.showSimpleToast('Incorrect credentials');
      }
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
