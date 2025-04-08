import { ProductService } from '../../../Services/product.service';
import { Product } from './../../models/product.model';
import { CategoryService } from './../../../Services/category.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { LogoSliderComponent } from '../logo-slider/logo-slider.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    LoaderComponent,
    LogoSliderComponent,
    CommonModule,
    ProductCardComponent,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  Products: Product[] = [];
  isLoading: boolean = true;
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories fetched successfully:', this.categories);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.isLoading = false;
      },
    });

    this.ProductService.getTopSellingProducts(6).subscribe({
      next: (data) => {
        this.Products = data;
        console.log('Products fetched successfully:', this.Products);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }
}
