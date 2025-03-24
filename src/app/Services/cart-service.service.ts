import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];

  constructor() { }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cart.find(cartItem => cartItem.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (quantity <= 0) {
      this.removeFromCart(id);
    }
  }
}
