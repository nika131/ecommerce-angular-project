import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
private productService = inject(ProductService);
  private cartService = inject(CartService);
  products: any[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  
  addToCart(product: any): void {
    this.cartService.addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price 
    }, 1);
  }
}
