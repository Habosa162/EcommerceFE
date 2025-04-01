import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { ProductService as ps } from '../../../Services/product.service';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
 // categories: string[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery: string = '';
  // brands: string[] = ['Apple', 'Samsung', 'Sony', 'Canon', 'HP', 'LG'];
  // priceRanges: string[] = ['Under $100', '$100 - $200', '$200 - $300'];
  // selectedCategories: string[] = [];
  // selectedBrands: string[] = [];
  // selectedPriceRange: string = '';
// Add these properties to your component
selectedCategories: string[] = [];
selectedBrands: string[] = [];
selectedPriceRange: string = '';
priceRanges: string[] = ['Under $100', '$100 - $200', '$200 - $300'];
brands: string[] = ['Hi-Tech Limited', 'hp limited', 'The Apple Limited', 'A4 Tech',
                   'The Hitachi Limited', 'Huawei Company', 'KEA Limited', 'Sony Limited'];
categories: Category[]=[];

// Add these methods for filtering
toggleCategoryFilter(category: string, event: any) {
    if (event.target.checked) {
        this.selectedCategories.push(category);
    } else {
        this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
}

toggleBrandFilter(brand: string, event: any) {
    if (event.target.checked) {
        this.selectedBrands.push(brand);
    } else {
        this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    this.applyFilters();
}

filterByPrice(range: string) {
    this.selectedPriceRange = range;
    this.applyFilters();
}

applyFilters() {
    this.filteredProducts = this.products.filter(product => {
        const matchesCategory = this.selectedCategories.length ?
            this.selectedCategories.includes(product.category) : true;
        const matchesBrand = this.selectedBrands.length ?
            this.selectedBrands.includes(product.brand || '') : true;
        const matchesPrice = this.priceFilter(product.price);
        return matchesCategory && matchesBrand && matchesPrice;
    });
}

priceFilter(price: number): boolean {
    if (!this.selectedPriceRange) return true;
    if (this.selectedPriceRange === 'Under $100') return price < 100;
    if (this.selectedPriceRange === '$100 - $200') return price >= 100 && price <= 200;
    if (this.selectedPriceRange === '$200 - $300') return price >= 200 && price <= 300;
    return true;
}
getAllCategories() {
  this.categoryService.getCategories().subscribe((categories)=>{
    this.categories = categories;
  })

}
  constructor(private productService: ProductService
    , private cartService: CartService,
    private categoryService: CategoryService,
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      // this.categories = [...new Set(data.map((p) => p.category))];
      this.getAllCategories() ;
    });
  }


  filterByCategory(category: string): void {
    this.filteredProducts = category ? this.products.filter(p => p.category === category) : this.products;
  }

  sortProducts(sortBy: string): void {
    if (sortBy === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

   addToCart(product: any) {
    this.cartService.addToCart(product);
  }



  }




