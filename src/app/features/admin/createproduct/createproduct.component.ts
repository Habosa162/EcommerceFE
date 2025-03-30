import { Component } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createproduct',
  imports: [FormsModule, CommonModule],
  templateUrl: './createproduct.component.html',
  styles: ``
})
export class CreateproductComponent {
  products: Product[] = [];

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
    category: '',
    rating: 0,
    reviews: [],
    discount: 0,
    finalPrice: 0

  };

  constructor(private productService: ProductService) { }

  createProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.imageUrl) {
      alert('Please fill in all required fields.');
      return;
    }

    // Calculate Final Price after Discount
    this.newProduct.finalPrice = this.newProduct.price - (this.newProduct.discount ?? 0);

    this.productService.createProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        alert('Product created successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Error creating product:', err),
    });
  }

  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      category: '',
      rating: 0,
      reviews: [],
      discount: 0,
      finalPrice: 0
    };
  }
}
