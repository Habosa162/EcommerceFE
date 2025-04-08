import { Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService  {
  private cartItems = signal<any[]>(this.loadCart()); 
  private userId: string | null = null;

  constructor(private authService: AuthService) { }
  
  setUser(userId: string | null) {
    const isSwitchingToUser = !this.userId && userId;

    this.userId = userId;
    if (isSwitchingToUser) {
      this.mergeGuestToUserCart();
    }
    this.cartItems.set(this.loadCart());
  }
  private getCartStorageKey(): string {
    return this.userId ? `cart_${this.userId}` : 'cart_guest';
  }

  private loadCart(): any[] {
    const storedCart = localStorage.getItem(this.getCartStorageKey());
    return storedCart ? JSON.parse(storedCart) : [];
  }

   saveCart(): void {
    const guestCart = localStorage.getItem('cart_guest');
    const userCartKey = this.getCartStorageKey();
    const existingUserCart = localStorage.getItem(userCartKey);

    if (guestCart) {
        let mergedCart = JSON.parse(guestCart);

        localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
        localStorage.removeItem('cart_guest'); // Remove guest cart after migration
    } else {
        localStorage.setItem(userCartKey, JSON.stringify(this.cartItems()));
    }
}


  getCart() {

    return this.cartItems();
  }
  clearCart(){
    this.cartItems.set([]); 
    localStorage.removeItem(this.getCartStorageKey()); 
  }

  // Updated addToCart method to accept quantity
  addToCart(product: any, quantity: number = 1) {
    const isLoggedIn = this.authService.isLoggedIn();
    const cartKey = isLoggedIn ? `cart_${this.userId}` : 'cart_guest';
    const storedCart = localStorage.getItem(cartKey);
    const currentItems = storedCart ? JSON.parse(storedCart) : [];
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({
        ...product,
        quantity: quantity,
        price: Number(product.price),
        finalPrice: Number(product.finalPrice) || Number(product.price)
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(currentItems));
    if (cartKey === this.getCartStorageKey()) {
      this.cartItems.set(currentItems);
    }
  }
  
  updateQuantity(productId: number, change: number) {
    const currentItems = this.cartItems(); 
    const updatedItems = currentItems.map((item) => {
      if (item.id === productId) {
        const updatedQuantity = item.quantity + change;
        if (updatedQuantity > 0) {
          return { ...item, quantity: updatedQuantity }; 
        }
        return null; 
      }
      return item; 
    }).filter(item => item !== null); 

    this.cartItems.set(updatedItems as any[]);
    this.saveCart(); 
  }

  getCartCount(): number {
    const currentUserId = this.authService.getUserData()?.ID ?? null;
    if (this.userId !== currentUserId) {
      this.userId = currentUserId;
      // Defer signal mutation to avoid runtime errors
      queueMicrotask(() => {
        this.cartItems.set(this.loadCart());
      });
    }
  
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  }
  

  getTotalPrice() {
    return this.cartItems().reduce(
      (acc, item) => acc + item.finalPrice * item.quantity,
      0
    );
  }
  private mergeGuestToUserCart() {
    const guestCart = localStorage.getItem('cart_guest');
    const userCartKey = this.getCartStorageKey();
  
    if (guestCart) {
      const guestItems = JSON.parse(guestCart);
      const userItems = JSON.parse(localStorage.getItem(userCartKey) || '[]');
  
      guestItems.forEach((guestItem: any) => {
        const existingItem = userItems.find((item: any) => item.id === guestItem.id);
        if (existingItem) {
          existingItem.quantity += guestItem.quantity;
        } else {
          userItems.push(guestItem);
        }
      });
  
      localStorage.setItem(userCartKey, JSON.stringify(userItems));
      localStorage.removeItem('cart_guest');
    }
  }
  

}
