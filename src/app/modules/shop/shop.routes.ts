import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { authGuard } from '../../core/guards/auth-guard';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: ProductList,
    title: 'Shop Catalog'
  },
  {
    path: 'product/:id',
    component: ProductDetail,
    title: 'Product Detail'
  },
  {
    path: 'cart',
    component: Cart,
    title: 'Shopping Cart'
  },
  {
    path: 'checkout',
    component: Checkout,
    canActivate: [authGuard], 
    title: 'Checkout'
  }
];