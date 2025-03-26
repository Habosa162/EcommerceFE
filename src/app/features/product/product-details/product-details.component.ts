import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product, Review } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  newReview: Review = { id: 0, userId: 1, productId: 0, rating: 0, comment: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe((data) => {
        this.product = data;
        this.newReview.productId = data.id;
      });
    }
  }

  submitReview(): void {
    this.productService.addReview(this.product!.id, this.newReview).subscribe(() => {
      this.product!.reviews.push(this.newReview);
      this.newReview = { id: 0, userId: 1, productId: this.product!.id, rating: 0, comment: '' };
    });
  }
}