import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //dynamically update the cart badge in the navbar
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable(); //Other components or services can subscribe to this observable to get the latest cart items.
  // this.cartService.cart$.subscribe(cartItems => {
  //   console.log('Cart updated:', cartItems);
  // });

  constructor() { }

  loadCart(): CartItem[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

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
    this.saveCart(); //Save the cart to localStorage
    //Update the cartSubject to notify all subscribers about the updated cart items.
    this.cartSubject.next([...this.cart]);
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
    this.cartSubject.next([...this.cart]);
  }
  clearCart(): void {
    this.cart = [];
    this.saveCart();
    this.cartSubject.next(this.cart);
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.cart.find(cartItem => cartItem.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (quantity <= 0) {
      this.removeFromCart(id);
    }
    this.saveCart();
    this.cartSubject.next([...this.cart]);
  }
  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
