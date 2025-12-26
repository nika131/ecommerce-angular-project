import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartservice = inject(CartService)
  authService = inject(AuthService);

  signOut() {
    this.authService.signOut();
  }

  cartItemCount$ = this.cartservice.cartItems$.pipe(
    map(items => items.reduce((total, item)=> total + item.quantity, 0))
  )
}
