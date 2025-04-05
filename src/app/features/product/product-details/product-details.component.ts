import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import {IProduct, Product, Review } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  brands: string[] = [];
  newReview: Review = {
    productId: 0,
    comment: '',
    rating: 0
    // Uncomment if you want to use these fields
    // createdAt: new Date(),
    // userName: 'Anonymous'
  };
  wishlistItems: Product[] = [];
  cartItems = signal<any[]>([]); // Signal to track cart items

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id')!;
      if (productId) {
        this.loadProductDetails(productId);
        this.loadRelatedProducts(productId);
        this.loadBrands();
        this.loadCartItems(); // Load cart items on init
      }
    });
  }

   // Load cart items from service
   private loadCartItems(): void {
    this.cartItems.set(this.cartService.getCart());
  }

  // Check if product is in cart
  isInCart(product: Product): boolean {
    return this.cartItems().some(item => item.id === product.id);
  }


  private loadProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        if (data) {
          this.product = data;
          this.initializeProductData();
          this.newReview.productId = data.id;
        }
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  private loadRelatedProducts(productId: number): void {
    this.productService.getRelatedProducts(productId).subscribe({
      next: (products) => this.relatedProducts = products,
      error: (err) => console.error('Error loading related products:', err)
    });
  }

  private loadBrands(): void {
    this.productService.getBrands().subscribe({
      next: (brands) => this.brands = brands,
      error: (err) => console.error('Error loading brands:', err)
    });
  }

  private initializeProductData(): void {
    if (!this.product) return;

    // Initialize missing product properties
    this.product.avgRate = typeof this.product.avgRate === 'number' ? this.product.avgRate : 0;
    this.product.reviewCount = typeof this.product.reviewCount === 'number' ?
      this.product.reviewCount :
      (this.product.reviews?.length || 0);
    this.product.reviews = this.product.reviews || [];

    // Format review dates if they exist
    if (this.product.reviews) {
      this.product.reviews = this.product.reviews.map(review => ({
        ...review,
        // Uncomment if you want to use these fields
        // createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
        // userName: review.userName || 'Anonymous'
      }));
    }
  }

  submitReview(): void {
    if (!this.product) return;
    if (!this.newReview.comment || !this.newReview.rating) return;

    // Create the review object with productId included
    const reviewToSubmit: Review = {
      productId: this.product.id,  // Add productId here
      comment: this.newReview.comment,
      rating: this.newReview.rating
      // Uncomment if you want to use these fields
      // createdAt: new Date(),
      // userName: 'Current User' // You would replace this with actual user data
    };

    // Now just pass the complete review object
    this.productService.addReview(reviewToSubmit).subscribe({
      next: (addedReview) => {
        if (!this.product) return;

        this.product.reviews = [...(this.product.reviews || []), addedReview];
        this.product.avgRate = this.calculateAverageRating(this.product.reviews);
        this.product.reviewCount = this.product.reviews.length;

        this.resetReviewForm();
      },
      error: (err) => console.error('Error submitting review:', err)
    });
  }

  private resetReviewForm(): void {
    if (!this.product) return;

    this.newReview = {
      productId: this.product.id,
      comment: '',
      rating: 0
      // Uncomment if you want to use these fields
      // createdAt: new Date(),
      // userName: 'Anonymous'
    };
  }

  private calculateAverageRating(reviews: Review[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  }

  // Wishlist functionality
  isInWishlist(product: Product): boolean {
    return this.wishlistItems.some(item => item.id === product.id);
  }

  addToWishlist(product: Product): void {
    if (this.isInWishlist(product)) {
      this.wishlistItems = this.wishlistItems.filter(item => item.id !== product.id);
    } else {
      this.wishlistItems.push(product);
    }
  }

  // // Cart functionality
  // addToCart(product: Product): void {
  //   if (product.stock && product.stock > 0) {
  //     this.cartService.addToCart(product, 1);
  //   }
  // }

  // Updated addToCart method to handle both add and remove
  addToCart(product: Product): void {
    const cartProduct: any = {
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
      finalPrice: product.finalPrice || product.price,
      isAccepted: product.isAccepted,
      isDeleted: product.isDeleted,
      subCategory: product.subCategoryName
    };

    if (this.isInCart(product)) {
      // Remove from cart
      this.cartService.updateQuantity(product.id, -1); // Decrease quantity by 1
    } else {
      // Add to cart
      this.cartService.addToCart(cartProduct, 1);
    }

    // Refresh cart items
    this.loadCartItems();
  }

  // Rating helper
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
