import { Component, computed, OnInit,Signal,signal } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems!: Signal<any[]>; // Initialize cartItems as a signal
  constructor(private cartService: CartService, private authService: AuthService) {}
  ngOnInit(): void {
    this.cartService.setUser(this.authService.getUserData()?.ID);
    this.cartService.saveCart(); // Save the cart when the component initializes
    this.cartItems = computed(() => this.cartService.getCart()); // Assign a computed signal

  }



  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
  }

  totalPrice() {
    return this.cartService.getTotalPrice();
  }

}
