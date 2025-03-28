import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-payment-success',
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  apiUrl: string = 'https://localhost:7280/api/Order'; 
  cartItems: any[] = [];
  totalPrice: number = 0;
  //customerId: string = '1a66c387-d7c3-4918-82ec-d46a76060487'; 
  customerId: string = ''; 

  paymentMethod: string = 'Paymob'; 

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    //const token = localStorage.getItem('authToken');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjFhNjZjMzg3LWQ3YzMtNDkxOC04MmVjLWQ0NmE3NjA2MDQ4NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOlsiTW9oYW1lZCIsIkhhbnkiXSwiZXhwIjoxNzQzMzc3ODAzLCJpc3MiOiJteWRvbWFpbi5jb20iLCJhdWQiOiJteWRvbWFpbi5jb20ifQ.87Jgj62t7WPJEO9zEY5Il079HxXJzE4pJ5VztWVJ__0";
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.customerId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        console.log("Decoded token:", decodedToken);
        console.log("Customer ID:", this.customerId);
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Invalid token. Please log in again.');
        this.router.navigate(['/login']);
        return;
      }
    } else {
      alert('No token found. Please log in.');
      this.router.navigate(['/login']);
      return;
    }

    const paymentMethod = localStorage.getItem('paymentMethod'); 
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
    console.log("Cart items:", this.cartItems);
    const orderData = {
      TotalAmount: this.totalPrice,  
      CustomerId: this.customerId,       
      PaymentStatus: this.paymentMethod === 'COD' ? 0 : 1, 
      orderItems: this.cartItems.map((item: { id: any; name: any; quantity: any; finalPrice: any; }) => ({
        ProductId: item.id,  
        Name: item.name,      
        Qty: item.quantity,         
        UnitPrice: item.finalPrice  
      }))
    };

    console.log("Posting order to backend:", orderData);

    this.http.post(this.apiUrl, orderData).subscribe({
      next: (response) => {
        console.log("Order placed successfully:", response);
        alert('Order placed successfully! It will be delivered within 3 days.');

        this.cartService.clearCart(); 
        localStorage.removeItem('paymentMethod'); 
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error("Error placing order:", error);
        alert('Failed to place the order.');
      }
    });
  }

}
