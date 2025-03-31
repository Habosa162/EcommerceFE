import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product, Review } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  newReview: Review = { 
    productId: 0, 
    comment: '', 
    rating: 0, 
    // createdAt: new Date(), 
    // userName: 'Anonymous' 
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data) => {
        if (data) {
          this.product = data;

          // Ensure avgRate is set correctly if it is missing or invalid
          if (typeof this.product.avgRate !== 'number' || !this.product.avgRate) {
            this.product.avgRate = 0;
          }
    
          // Initialize reviewCount if it doesn't exist
          if (typeof this.product.reviewCount !== 'number') {
            this.product.reviewCount = 0;
          }

          this.newReview.productId = data.id;
        }
      });
    }
  }

  submitReview(): void {
    if (!this.product) return;

    this.productService.addReview(this.product.id, this.newReview).subscribe({
      next: () => {
        if (!this.product) return;

        // Initialize reviews array if it doesn't exist
        if (!this.product.reviews) {
          this.product.reviews = [];
        }

        // Add the new review
        this.product.reviews.push({...this.newReview});

        // Recalculate average rating
        this.product.avgRate = this.calculateAverageRating(this.product.reviews);
        this.product.reviewCount = this.product.reviews.length;

        // Reset the review form
        this.newReview = { 
          productId: this.product.id, 
          comment: '', 
          rating: 0, 
          // createdAt: new Date(), 
          // userName: 'Anonymous' 
        };
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
  }

  private calculateAverageRating(reviews: Review[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }
}
