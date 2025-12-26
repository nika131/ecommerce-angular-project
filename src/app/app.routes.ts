import { Routes } from '@angular/router';
import { Homepage1 } from './core/pages/homepage1/homepage1';
import { authGuard } from './core/guards/auth-guard';
import { AboutUs } from './core/pages/about-us/about-us';
import { ContactUs } from './core/pages/contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: Homepage1,
    title: '3legant | Home'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.routes').then(m => m.SHOP_ROUTES)
  },
  {
    path: 'about',
    component: AboutUs,
    title: 'About Us'
  },
    {
    path: 'contact',
    component: ContactUs,
    title: 'Contact Us'
  },
  { path: '**', redirectTo: '' }
];
