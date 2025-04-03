import { WishlistService } from './../../../Services/wishlist.service';
import { CartService } from './../../../Services/cart.service';
import { Component, Input, ViewChild } from '@angular/core';
import { IProduct, Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: any;

  productQuantities: { [productId: number]: number } = {};
  constructor(
    private CartService: CartService,
    private WishlistService: WishlistService
  ) {}

  getProductQuantity(product: Product): number {
    return this.productQuantities[product.id] || 1;
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
    this.CartService.addToCart(IProduct, quantity);
    // this.showToast(product, 'added to cart');
  }

  get starArray() {
    const fullStars = Math.floor(this.product.avgRate);
    const hasHalfStar = this.product.avgRate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return [
      ...Array(fullStars).fill('full'),
      ...(hasHalfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty'),
    ];
  }
}
