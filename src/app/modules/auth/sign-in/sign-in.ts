import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signInForm = this.fb.group({
    email: ['user@test.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required, Validators.minLength(6)]]
  });

  get emailControl() { return this.signInForm.get('email')!; }
  get passwordControl() { return this.signInForm.get('password')!; }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        users => {
          if (users && users.length > 0) {
            this.router.navigate(['/']);
          } else {
            alert('Sign-in failed. Check credentials.');
          }
        },
        () => alert('An API error occurred during sign-in.')
      );
    }
  }
}
