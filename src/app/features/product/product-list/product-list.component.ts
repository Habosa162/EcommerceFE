import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { IProduct, Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';
import { ProductService as ps } from '../../../Services/product.service';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../core/models/category.model';
import { WishlistService } from '../../../Services/wishlist.service';
import { Router } from '@angular/router';

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
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedPriceRange: string = '';
  priceRanges: string[] = [
    'Under 1000 EGP',
    '1000 EGP - 2000 EGP',
    '2000 EGP - 3000 EGP',
    '3000 EGP - 5000 EGP',
    'Over 5000 EGP',
  ];
  categories: string[] = [];
  brands: string[] = [];

  // Update your filter methods to work with strings
  toggleCategoryFilter(category: string, event: any) {
    if (event) {
      if (event.target.checked) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories = this.selectedCategories.filter(
          (c) => c !== category
        );
      }
    } else {
      // For programmatic selection (from query params)
      this.selectedCategories = [category];
    }
    this.applyFilters();
  }

  toggleBrandFilter(brand: string, event: any) {
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    }
    this.applyFilters();
  }

  filterByPrice(range: string) {
    this.selectedPriceRange = range;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategories.length
        ? this.selectedCategories.includes(product.category)
        : true;
      const matchesBrand = this.selectedBrands.length
        ? this.selectedBrands.includes(product.brand)
        : true;
      const matchesPrice = this.priceFilter(product.price);
      return matchesCategory && matchesBrand && matchesPrice;
    });
  }

  priceFilter(price: number): boolean {
    if (!this.selectedPriceRange) return true;

    switch (this.selectedPriceRange) {
      case 'Under 1000 EGP':
        return price < 1000;
      case '1000 EGP - 2000 EGP':
        return price >= 1000 && price <= 2000;
      case '2000 EGP - 3000 EGP':
        return price >= 2000 && price <= 3000;
      case '3000 EGP - 5000 EGP':
        return price >= 3000 && price <= 5000;
      case 'Over 5000 EGP':
        return price > 5000;
      default:
        return true;
    }
  }
  getAllCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories.map((c) => c.name);
    });
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute // Add this for category in nave par
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);

      this.filteredProducts = data;
      this.getAllCategories();
      this.categories = [...new Set(data.map((p) => p.category))].filter(
        (c) => c
      );
      this.brands = [...new Set(data.map((p) => p.brand))].filter((b) => b);

      // Check for category query parameter
      this.route.queryParams.subscribe((params) => {
        if (params['category']) {
          const category = params['category'];
          this.selectedCategories = [category];
          this.applyFilters();
        }
      });
    });
  }

  filterByCategory(category: string): void {
    this.filteredProducts = category
      ? this.products.filter((p) => p.category === category)
      : this.products;
  }

  sortProducts(sortBy: string): void {
    if (sortBy === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter((p) =>
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
      this.wishlistItems = this.wishlistItems.filter(
        (p) => p.id !== product.id
      );
      this.showToast(product, 'removed from wishlist');
    } else {
      this.wishlistItems.push(product);
      this.wishlistService.addToWishList(product.id).subscribe();
      this.showToast(product, 'added to wishlist');
    }
  }

  addToCart(product: Product): void {
    // convert product to IProduct here then send IProduct to addToCart
    let IProduct: IProduct = {
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
      subCategory: product.subCategoryName,
    };
    const quantity = this.getProductQuantity(product);
    this.cartService.addToCart(IProduct, quantity);
    this.showToast(product, 'added to cart');
  }

  // Add this property to track product quantities
  productQuantities: { [productId: number]: number } = {};

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
    return this.wishlistItems.some((p) => p.id === product.id);
  }

  // Add these properties
  activeProducts: { [productId: number]: boolean } = {};

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
      this.wishlistItems = this.wishlistItems.filter(
        (p) => p.id !== product.id
      );
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

  // In product-list.component.ts
  clearAllFilters(): void {
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.selectedPriceRange = '';
    this.searchQuery = '';
    this.applyFilters();

    // Optionally navigate without query params
    //this.router.navigate(['/products']);
  }

  // In your component class
  countProductsInCategory(category: string): number {
    return this.products.filter((p) => p.category === category).length;
  }

  countProductsByBrand(brand: string): number {
    return this.products.filter((p) => p.brand === brand).length;
  }
}
