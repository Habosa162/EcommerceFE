import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedSort: string = '';


  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productservice.getAllProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(p => p.SubCategoryName))];
        this.brands = [...new Set(products.map(p => p.brand))];
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }


  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategory ? product.category === this.selectedCategory : true)
    );
  }

  sortProducts(): void {
    if (this.selectedSort === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productservice.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
          alert('Product deleted successfully!');
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}
