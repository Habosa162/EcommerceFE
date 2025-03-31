import { Component } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createproduct.component.html',
})
export class CreateproductComponent {
  products: Product[] = [];

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    subCategoryId: 0,
    subCategoryName: '',
    imageUrl: '',
    stock: 0,
    avgRate: 0,
    brand: '',
    discountAmount: 0,
    isAccepted: false,
    isDeleted: false,
    color: '',
    finalPrice: 0,
    title: '',
    category: '',
    reviewCount: 0,
    priceRange: '',
    stockQuantity: 0
  };

  constructor(private productService: ProductService) {}

  createProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.imageUrl) {
      alert('Please fill in all required fields (Name, Price, and Image URL).');
      return;
    }

    // Calculate final price
    this.newProduct.finalPrice = this.newProduct.price - this.newProduct.discountAmount;

    this.productService.createProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        alert('Product created successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating product:', err);
        alert('Failed to create product. Please try again.');
      }
    });
  }

  resetForm(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      subCategoryId: 0,
      subCategoryName: '',
      imageUrl: '',
      stock: 0,
      avgRate: 0,
      brand: '',
      discountAmount: 0,
      isAccepted: false,
      isDeleted: false,
      color: '',
      finalPrice: 0,
      title: '',
      category: '',
      reviewCount: 0,
      priceRange: '',
      stockQuantity: 0
    };
  }
}
