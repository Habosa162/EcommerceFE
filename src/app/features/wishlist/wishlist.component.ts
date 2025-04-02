import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { ProductDto } from './../../core/models/product.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-wishlist',
  imports: [CommonModule,NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  constructor(private cartService:CartService){}

   TEST_PRODUCTS: ProductDto[] = [
    {
      Id: 1,
      Name: 'Laptop',
      Description: 'High-performance laptop for gaming and work',
      Price: 1200.99,
      SubCategoryId: 2,
      SubCategoryName: 'Electronics',
      ImageUrl: 'https://example.com/laptop.jpg',
      Stock: 10,
      AvgRate: 4.5,
      Brand: 'Dell',
      DiscountAmount: 100,
      IsAccepted: true,
      IsDeleted: false,
      color: 'Black',
      finalPrice: 1100.99
    },
    {
      Id: 2,
      Name: 'Smartphone',
      Description: 'Latest Android smartphone with great camera',
      Price: 899.99,
      SubCategoryId: 2,
      SubCategoryName: 'Electronics',
      ImageUrl: 'https://example.com/smartphone.jpg',
      Stock: 20,
      AvgRate: 4.8,
      Brand: 'Samsung',
      DiscountAmount: 50,
      IsAccepted: true,
      IsDeleted: false,
      color: 'Blue',
      finalPrice: 849.99
    },
    {
      Id: 3,
      Name: 'Wireless Headphones',
      Description: 'Noise-canceling wireless headphones',
      Price: 199.99,
      SubCategoryId: 3,
      SubCategoryName: 'Accessories',
      ImageUrl: 'https://example.com/headphones.jpg',
      Stock: 30,
      AvgRate: 4.7,
      Brand: 'Sony',
      DiscountAmount: 20,
      IsAccepted: true,
      IsDeleted: false,
      color: 'Red',
      finalPrice: 179.99
    },
    {
      Id: 4,
      Name: 'Smartwatch',
      Description: 'Fitness tracking smartwatch with heart rate monitor',
      Price: 299.99,
      SubCategoryId: 3,
      SubCategoryName: 'Wearables',
      ImageUrl: 'https://example.com/smartwatch.jpg',
      Stock: 15,
      AvgRate: 4.6,
      Brand: 'Apple',
      DiscountAmount: 30,
      IsAccepted: true,
      IsDeleted: false,
      color: 'Silver',
      finalPrice: 269.99
    },
    {
      Id: 5,
      Name: 'Gaming Mouse',
      Description: 'High-precision gaming mouse with RGB lighting',
      Price: 49.99,
      SubCategoryId: 4,
      SubCategoryName: 'Gaming Accessories',
      ImageUrl: 'https://example.com/mouse.jpg',
      Stock: 50,
      AvgRate: 4.9,
      Brand: 'Logitech',
      DiscountAmount: 5,
      IsAccepted: true,
      IsDeleted: false,
      color: 'Black',
      finalPrice: 44.99
    }
  ];
  

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
  

addToCart(product: ProductDto): void {
  // const quantity = this.getProductQuantity(product);
  this.cartService.addToCart(product, 2);
  // this.showToast(product, 'added to cart');
}
}
