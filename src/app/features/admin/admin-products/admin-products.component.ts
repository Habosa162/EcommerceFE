import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/category.service';
import { SubCategoryService } from '../../../Services/sub-category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: any[] = [];
  brands: string[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedSort: string = '';
  isModalOpen: boolean = false;
  selectedProduct: any = {
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
    stockQuantity: 0,
  };
  constructor(private productservice: ProductService, private subcategoriesservice: SubCategoryService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchsubcategories();
  }

  fetchProducts(): void {
    this.productservice.getAllProducts().subscribe({
      next: (products) => {
        this.products = products.map(product => ({
          ...product,
          id: Number(product.id)
        }));
        this.filteredProducts = this.products;
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  fetchsubcategories(): void {
    this.subcategoriesservice.getsubCategories().subscribe({
      next: (subcategories) => {
        this.categories = subcategories;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategory ? product.subCategoryName === this.selectedCategory : true)
    );
  }

  sortProducts(): void {
    if (this.selectedSort === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.isModalOpen = true;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedProduct.imageUrl = file;
    }
  }


  closeModal(): void {
    this.isModalOpen = false;
  }

  updateProduct(): void {
    const formData = new FormData();

    // Append all product fields to the FormData
    formData.append('name', this.selectedProduct.name);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('description', this.selectedProduct.description);
    formData.append('subCategoryId', this.selectedProduct.subCategoryId.toString());
    formData.append('stock', this.selectedProduct.stock.toString());


    // Check if the image is a file and append it to the FormData
    if (this.selectedProduct.imageUrl instanceof File) {
      formData.append('imageUrl', this.selectedProduct.imageUrl);
    }


    this.productservice.updateProduct(formData, this.selectedProduct.id).subscribe(
      (response: any) => {
        console.log('Product updated successfully:', response.message);
        this.fetchProducts();
        this.closeModal();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }


  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productservice.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
          alert('Product deleted successfully!');
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}

