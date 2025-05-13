import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
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
  ],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
      this.authService.login(userEmail, userPassword);

      if (this.authService.login(userEmail, userPassword)) {
        console.log('successful authentication');
      } else {
        this.loginForm.reset();
      }
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
