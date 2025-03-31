import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductService } from '../../../core/services/product.service'; // Add this import
import { Product } from '../../../core/models/product.model'; // Add this import
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  profileBtnClicked: boolean = false;
  searchQuery: string = '';
  showSearchResults: boolean = false;
  searchResults: any[] = []; // Replace with your product type
  isLoggedIn: boolean = false;
  private searchSubject = new Subject<string>();


  @Output() search = new EventEmitter<string>();
  // productService: any;

  constructor(private productService: ProductService,private cartService: CartService,protected authService: AuthService) {
    this.setupSearch();
  }

  profileBtn() {
    this.profileBtnClicked = !this.profileBtnClicked;
  }

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after last keystroke
      distinctUntilChanged() // Only emit if value changed
    ).subscribe(query => {
      if (query.length > 2) { // Only search if query has at least 3 characters
        this.performSearch(query);
      } else {
        this.showSearchResults = false;
        this.searchResults = [];
      }
    });
  }

  isLoading: boolean = false;

  private performSearch(query: string) {
    this.isLoading = true;
    this.productService.searchProducts(query).subscribe({
      next: (results: Product[]) => {
        this.searchResults = results;
        this.showSearchResults = results.length > 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Search error:', err);
        this.searchResults = [];
        this.showSearchResults = false;
        this.isLoading = false;
      }
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.showSearchResults = false;
    this.searchResults = [];
  }
  cartCount() {
    return this.cartService.getCartCount();
  }
}
