import { Component } from '@angular/core';
import { CartItem, CartService } from '../../Services/cart-service.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart:CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) 
  {
  }
  ngOnInit() {
    this.cart = this.cartService.getCart(); // Load cart from localStorage
    this.totalPrice = this.cartService.getTotalPrice();
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }
  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

}
