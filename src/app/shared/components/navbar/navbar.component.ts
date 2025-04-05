import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductService } from '../../../core/services/product.service'; // Add this import
import { Product } from '../../../core/models/product.model'; // Add this import
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profileBtnClicked: boolean = false;
  searchQuery: string = '';
  showSearchResults: boolean = true;
  searchResults: Product[] = []; // Changed to Product[] for type safety
  categories: Category[] = [];
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  private searchSubject = new Subject<string>();

  @Output() search = new EventEmitter<string>();
  @ViewChild('searchResultItemsContainer') searchResultItem!: ElementRef;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    protected authService: AuthService,
    protected categoryService: CategoryService,
    private renderer: Renderer2
  ) {
    // this.setupSearch();
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.fetchSuggestions(term);
    });
  }

  ngAfterViewInit() {
    // Listen for global clicks
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      // Check if the click is outside the search result item
      if (
        this.searchResultItem &&
        !this.searchResultItem.nativeElement.contains(event.target)
      ) {
        this.showSearchResults = false;
      }
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  fetchSuggestions(term: string) {
    if (!term.trim()) {
      this.searchResults = [];
      return;
    }

    this.productService.searchProducts(term).subscribe((res) => {
      this.searchResults = res;
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    console.log(this.authService.getUserData());
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  profileBtn() {
    this.profileBtnClicked = !this.profileBtnClicked;
  }

  // onSearchInput() {
  //   this.searchSubject.next(this.searchQuery);
  // }

  // private setupSearch() {
  //   this.searchSubject.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged()
  //   ).subscribe(query => {
  //     if (query.length > 2) {
  //       this.performSearch(query);
  //     } else {
  //       this.clearSearchResults();
  //     }
  //   });
  // }

  // private performSearch(query: string) {
  //   this.isLoading = true;
  //   this.productService.searchProducts(query).subscribe({
  //     next: (results: Product[]) => {
  //       this.searchResults = results;
  //       this.showSearchResults = results.length > 0;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Search error:', err);
  //       this.clearSearchResults();
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // private clearSearchResults() {
  //   this.searchResults = [];
  //   this.showSearchResults = false;
  // }

  // clearSearch() {
  //   this.searchQuery = '';
  //   this.clearSearchResults();
  // }

  cartCount() {
    return this.cartService.getCartCount();
  }
}
