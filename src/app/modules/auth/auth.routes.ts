import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';

export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: SignIn,
    title: 'Sign In'
  },
  {
    path: 'sign-up',
    component: SignUp,
    title: 'Create Account'
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];