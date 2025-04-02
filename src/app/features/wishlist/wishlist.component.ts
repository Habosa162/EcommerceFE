import { IWishlist } from './../../core/models/wishlist.model';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { IProduct } from './../../core/models/product.model';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  imports: [CommonModule],
})
export class WishlistComponent implements OnInit{


  wishList:IWishlist[] =[] ;

  products:IProduct[]=[] ; 

  constructor(private cartService:CartService ,private wishListService : WishlistService){}
  ngOnInit(): void {
      this.wishListService.getWishList().subscribe((data)=>{
        console.log("----------------------------------------------------------");
        console.log("----------------------------------------------------------");
        console.log("----------------------------------------------------------");
        console.log(data);
        this.wishList = data;
        console.log("----------------------------------------------------------");
        console.log("----------------------------------------------------------");
        console.log("----------------------------------------------------------");
        return data ; 
      },(err)=>{
        console.log(err);
      })  
  }



  // getStars(rating: number): number[] {
  //   return Array(Math.round(rating)).fill(0);
  // }
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill('★');
  }
  

addToCart(product: IProduct): void {
  // const quantity = this.getProductQuantity(product);
  this.cartService.addToCart(product, 2);
  // this.showToast(product, 'added to cart');
}


}
