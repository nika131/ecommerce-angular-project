import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  public cartService = inject(CartService);

  decrementQuantity(productId: number): void {
    this.cartService.updateItemQuantity(productId, -1)
  }

  incrementQuantity(productId: number): void {
    this.cartService.updateItemQuantity(productId, 1)
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId)
  }

}
