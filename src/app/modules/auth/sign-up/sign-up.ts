import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { 'passwordMismatch': true }
    : null;
};

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: '../sign-in/sign-in.css',
})
export class SignUp {
private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    id: [Math.floor(Math.random() * 10000)], 
    token: ['mock-token-' + Math.floor(Math.random() * 1000000)]
  }, { validators: passwordMatchValidator }); 

  get firstNameControl() { return this.signUpForm.get('firstName')!; }
  get emailControl() { return this.signUpForm.get('email')!; }
  get passwordControl() { return this.signUpForm.get('password')!; }
  get confirmPasswordControl() { return this.signUpForm.get('confirmPassword')!; }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { firstName, email, password, token, id } = this.signUpForm.value;
      
      this.authService.signUp({ firstName, email, password, token, id }).subscribe({
        next: () => {
          alert('Account created and signed in successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Sign-up failed:', err);
          alert('Sign-up failed. User might already exist.');
        }
      });
    }
  }
}
