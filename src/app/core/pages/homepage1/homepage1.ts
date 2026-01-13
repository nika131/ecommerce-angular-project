import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HighlightOnHover } from '../../../shared/directives/highlight-on-hover';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage1',
  imports: [CommonModule, HighlightOnHover, RouterLink],
  templateUrl: './homepage1.html',
  styleUrl: './homepage1.css',
})
export class Homepage1 {
private productService = inject(ProductService);
  featuredProducts: any[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 4); 
    });
  }
}
