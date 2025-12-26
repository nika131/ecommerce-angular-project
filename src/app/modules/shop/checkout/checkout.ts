import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private http = inject(HttpClient);
  private router = inject(Router);

  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]]
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      const orderData = {
        details: this.checkoutForm.value,
        items: this.cartService.getCurrentCartItems(),
        total: this.cartService.getCartTotal(),
        date: new Date().toISOString()
      };

      this.http.post('http://localhost:3000/orders', orderData).subscribe({
        next: () => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Order placement failed', err);
          alert('Failed to place order. Check json-server connection.');
        }
      });
    }
  }
}
