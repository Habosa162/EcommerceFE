import { Component, computed } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  cartItems = computed(() => this.cartService.getCart());


  updateQuantity(productId: number, change: number) {
    this.cartService.updateQuantity(productId, change);
  }

  totalPrice() {
    return this.cartService.getTotalPrice();
  }

}
