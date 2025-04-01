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
  selectedFile!: File;
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

  constructor(private productService: ProductService) { }

  createProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.selectedFile) {
      alert('Please fill in all required fields (Name, Price, and Image).');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('subCategoryId', this.newProduct.subCategoryId.toString());
    formData.append('brand', this.newProduct.brand);
    formData.append('color', this.newProduct.color);
    formData.append('stock', this.newProduct.stock.toString());
    formData.append('discountAmount', this.newProduct.discountAmount.toString());
    formData.append('finalPrice', (this.newProduct.price - this.newProduct.discountAmount).toString());
    formData.append('productImage', this.selectedFile); // Attach file

    this.productService.createProduct(formData).subscribe({
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
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
