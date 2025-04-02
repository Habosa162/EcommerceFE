import { ProductService } from '../../../Services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  categoryData: any;
  productData: Product[] = [];
  categoryId: string | null = null;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.fetchCategory(this.categoryId);
    }
  }

  fetchCategory(id: string) {
    this.http.get(`https://localhost:7280/api/Category/${id}`).subscribe(
      (data) => {
        this.categoryData = data;
        console.log(this.categoryData);
        if (this.categoryData?.subCategories?.length > 0) {
          this.getSubCategoryProducts(this.categoryData.subCategories[0].id);
        }
      },
      (error) => {
        console.error('Error fetching category data', error);
      }
    );
  }
  getSubCategoryProducts(id: number) {
    this.ProductService.getProductsBySubCategoryId(id).subscribe(
      (data) => {
        this.productData = data;
        console.log('Products:', this.productData);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
}
