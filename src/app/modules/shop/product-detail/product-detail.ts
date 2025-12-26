import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product: any;
  quantity: number = 1;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id);
      })
    ).subscribe(data => {
      this.product = data;
    }, () => {
      console.error('Failed to fetch product details.');
    });
  }
  
  addToCart(product: any): void {
    if (this.quantity > 0) {
      this.cartService.addItem({ 
        id: product.id, 
        name: product.name, 
        price: product.price 
      }, this.quantity);
      alert(`${this.quantity} x ${product.name} added to cart!`);
    }
  }
}
