import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<any[]>(this.loadCart()); 

  constructor() { }

  private loadCart(): any[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  getCart() {
    return this.cartItems();
  }
  clearCart(){
    this.cartItems.set([]); 
    localStorage.removeItem('cart'); 
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
