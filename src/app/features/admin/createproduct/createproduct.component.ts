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

  // createProduct(): void {
  //   if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.imageUrl) {
  //     alert('Please fill in all required fields (Name, Price, and Image URL).');
  //     return;
  //   }

  //   // Calculate final price
  //   this.newProduct.finalPrice = this.newProduct.price - this.newProduct.discountAmount;

  //   this.productService.createProduct(this.newProduct).subscribe({
  //     next: (product) => {
  //       this.products.push(product);
  //       alert('Product created successfully!');
  //       this.resetForm();
  //     },
  //     error: (err) => {
  //       console.error('Error creating product:', err);
  //       alert('Failed to create product. Please try again.');
  //     }
  //   });
  // }

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

  createProduct(): void {
    console.log('Form submitted with data:', this.newProduct); // Debug log
  
    if (!this.newProduct.name || !this.newProduct.price || !this.selectedFile) {
      console.warn('Validation failed - missing required fields');
      alert('Please fill in all required fields (Name, Price, and Image).');
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('subCategoryId', this.newProduct.subCategoryId.toString());
    formData.append('subCategoryName', this.newProduct.subCategoryName);
    formData.append('stock', this.newProduct.stock.toString());
    formData.append('avgRate', this.newProduct.avgRate.toString());
    formData.append('brand', this.newProduct.brand);
    formData.append('discountAmount', this.newProduct.discountAmount.toString());
    formData.append('isAccepted', this.newProduct.isAccepted.toString());
    formData.append('isDeleted', this.newProduct.isDeleted.toString());
    formData.append('color', this.newProduct.color);
    formData.append('title', this.newProduct.title);
    formData.append('category', this.newProduct.category);
    formData.append('finalPrice', (this.newProduct.price - this.newProduct.discountAmount).toString());
    formData.append('stockQuantity', this.newProduct.stockQuantity.toString());
  
    
    formData.append('image', this.selectedFile); 
  
    console.log('FormData being sent:', formData);
  
    this.productService.createProduct(formData).subscribe({
      next: (product) => {
        console.log('API Response:', product); // Debug log
        this.products.push(product);
        alert('Product created successfully!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Full error details:', err);
        alert(`Failed to create product: ${err.message || 'Unknown error'}`);
      }
    });
  }
  
}
