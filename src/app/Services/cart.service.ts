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
    this.userId = userId;
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
        
        // if (existingUserCart) {
        //     const userCart = JSON.parse(existingUserCart);
            
        //     // Merge guest cart items into the user cart
        //     mergedCart.forEach(guestItem => {
        //         const existingItem = userCart.find(item => item.id === guestItem.id);
        //         if (existingItem) {
        //             existingItem.quantity += guestItem.quantity;
        //         } else {
        //             userCart.push(guestItem);
        //         }
        //     });

        //     mergedCart = userCart; // Use the merged cart
        // }

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
    const currentItems = this.cartItems();
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      const updatedItems = [...currentItems, { 
        ...product, 
        quantity: quantity,
        price: Number(product.price),
        finalPrice: Number(product.finalPrice) || Number(product.price)
      }];
      this.cartItems.set(updatedItems);
    }

    this.saveCart();
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

  getCartCount() {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems().reduce(
      (acc, item) => acc + item.finalPrice * item.quantity,
      0
    );
  }

}
