import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct, Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { ProductService as ps } from '../../../Services/product.service';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../core/models/category.model';
import { WishlistService } from '../../../Services/wishlist.service';

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
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery: string = '';
// Add these properties to your component
selectedCategories: string[] = [];
selectedBrands: string[] = [];
selectedPriceRange: string = '';
priceRanges: string[] = ['Under $100', '$100 - $200', '$200 - $300'];
// brands: string[] = ['Hi-Tech Limited', 'hp limited', 'The Apple Limited', 'A4 Tech',
//                    'The Hitachi Limited', 'Huawei Company', 'KEA Limited', 'Sony Limited'];
// categories: Category[]=[];
categories: string[] = []; // Change from Category[] to string[]
brands: string[] = []; // Remove hardcoded brands


// Update your filter methods to work with strings
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
      this.selectedBrands.includes(product.brand) : true;
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
  this.categoryService.getCategories().subscribe((categories: Category[]) => {
    this.categories = categories.map(c => c.name);
  });
}


  constructor(private productService: ProductService
    , private cartService: CartService,
    private categoryService: CategoryService,
    private wishlistService:WishlistService
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => { 
  
      this.products = data;

      this.filteredProducts = data;

      this.getAllCategories() ; 
      
      // Extract unique categories from products
      this.categories = [...new Set(data.map(p => p.category))].filter(c => c);
      
      // Extract unique brands from products
      this.brands = [...new Set(data.map(p => p.brand))].filter(b => b);
    });
  }



  filterByCategory(category: string): void {
    this.filteredProducts = category ? 
      this.products.filter(p => p.category === category) : 
      this.products;
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


  // Add to your component class
  @ViewChild('toastElement') toastElement!: ElementRef;
wishlistItems: Product[] = [];
toastProduct: Product | null = null;
toastMessage: string = '';
toastTimeout: any;

// Add these properties to your component
showCartSummary = false;
cartItems: any[] = []; // Array to hold cart items
cartSubtotal = 0;

addToWishlist(product: Product): void {
  if (this.isInWishlist(product)) {
    this.wishlistItems = this.wishlistItems.filter(p => p.id !== product.id);
    this.showToast(product, 'removed from wishlist');
  } else {
    this.wishlistItems.push(product);
    this.wishlistService.addToWishList(product.id) ;
    this.showToast(product, 'added to wishlist');
  }
}

addToCart(product: Product): void {
// convert product to IProduct here then send IProduct to addToCart 
let IProduct : IProduct = {
  id: product.id,
  name: product.name,
  imgUrl: product.imageUrl,
  color: product.color,
  description: product.description,
  price: product.price,
  stock: product.stock,
  avgRate: product.avgRate,
  subCategoryId: product.subCategoryId,
  brand: product.brand,
  discountAmount: product.discountAmount,
  finalPrice: product.finalPrice,
  isAccepted: product.isAccepted,
  isDeleted: product.isDeleted,
  subCategory: product.subCategoryName
}
  const quantity = this.getProductQuantity(product);
  this.cartService.addToCart(IProduct, quantity);
  this.showToast(product, 'added to cart');
}

// Add this property to track product quantities
productQuantities: {[productId: number]: number} = {};

// Helper methods for quantity management
getProductQuantity(product: Product): number {
  return this.productQuantities[product.id] || 1;
}

increaseProductQuantity(product: Product): void {
  if (!this.productQuantities[product.id]) {
    this.productQuantities[product.id] = 1;
  }
  if (this.productQuantities[product.id] < product.stock) {
    this.productQuantities[product.id]++;
  }
}

decreaseProductQuantity(product: Product): void {
  if (this.productQuantities[product.id] > 1) {
    this.productQuantities[product.id]--;
  }
}

showToast(product: Product, action: string): void {
  this.toastProduct = product;
  this.toastMessage = `${product.name} ${action}!`;
  
  const toastEl = this.toastElement.nativeElement;
  toastEl.classList.add('show');
  
  // Auto-hide after 3 seconds
  clearTimeout(this.toastTimeout);
  this.toastTimeout = setTimeout(() => {
    this.hideToast();
  }, 3000);
}

hideToast(): void {
  const toastEl = this.toastElement.nativeElement;
  toastEl.classList.remove('show');
}

isInWishlist(product: Product): boolean {
  return this.wishlistItems.some(p => p.id === product.id);

}


// Add these properties
activeProducts: {[productId: number]: boolean} = {};

// Add these methods
isProductActive(productId: number): boolean {
  return this.activeProducts[productId] || false;
}

activateProduct(productId: number): void {
  this.activeProducts[productId] = true;
  if (!this.productQuantities[productId]) {
    this.productQuantities[productId] = 1;
  }
}

deactivateProduct(productId: number): void {
  this.activeProducts[productId] = false;
}

toggleWishlist(product: Product): void {
  if (this.isInWishlist(product)) {
    this.wishlistItems = this.wishlistItems.filter(p => p.id !== product.id);
    this.showToast(product, 'removed from wishlist');
  } else {
    this.wishlistItems.push(product);
    this.showToast(product, 'added to wishlist');
  }
}

// Add these methods to your component class
clearPriceFilter(): void {
  this.selectedPriceRange = '';
  this.applyFilters();
}

clearAllFilters(): void {
  this.selectedCategories = [];
  this.selectedBrands = [];
  this.selectedPriceRange = '';
  this.searchQuery = '';
  this.applyFilters();
  // Reset any checkboxes in the UI
  this.filteredProducts = [...this.products];
}

// In your component class
countProductsInCategory(category: string): number {
  return this.products.filter(p => p.category === category).length;
}

countProductsByBrand(brand: string): number {
  return this.products.filter(p => p.brand === brand).length;
}

}

