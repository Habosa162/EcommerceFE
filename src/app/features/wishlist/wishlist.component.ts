import { IWishlist } from './../../core/models/wishlist.model';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { IProduct } from './../../core/models/product.model';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  imports: [CommonModule],
})
export class WishlistComponent implements OnInit, OnChanges {
  wishList: IWishlist[] = [];

  products: IProduct[] = [];

  constructor(
    private cartService: CartService,
    private wishListService: WishlistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getWishList();
  }

  ngOnInit(): void {
    this.getWishList();
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill('★');
  }

  getWishList() {
    this.wishListService.getWishList().subscribe(
      (data) => {
        this.wishList = data;
        this.cdr.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product, 1);
  }

  removeFromWishList(wishListID: number) {
    this.wishListService.removeFromWishList(wishListID).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.wishList = this.wishList.filter((item) => item.id !== wishListID);
    this.cdr.detectChanges();
    // window.location.reload();
  }
}
