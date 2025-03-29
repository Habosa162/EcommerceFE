import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import {jwtDecode} from 'jwt-decode';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-success',
  imports: [CommonModule,RouterModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  apiUrl: string = 'https://localhost:7280/api/Order'; 
  shippingApiUrl: string = 'https://localhost:7280/api/Shipping';
  cartItems: any[] = [];
  totalPrice: number = 0;
  customerId: string = ''; 
  orderId : number = 0;

  paymentMethod: string = ''; 
  billingDetails: any;

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
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

     this.paymentMethod = localStorage.getItem('paymentMethod')??''; 
    const storedBilling = localStorage.getItem('billingDetails');

    if (storedBilling) {
      this.billingDetails = JSON.parse(storedBilling);
    }

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
      next: (response:any) => {
        this.orderId = response.orderID;
        console.log("Order placed successfully:", response);
        this.createShipping();
        
      },
      error: (error) => {
        console.error("Error placing order:", error);
        alert('Failed to place the order.');
      }
    });
  }

  createShipping(){
    console.log("Creating shipping with orderId:", this.orderId);
    const shippingData = {
      OrderId : this.orderId,
      CustomerId: this.customerId,
      DeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from today
      ShippingStatus: 0, // Pending status
      Country: this.billingDetails.country,
      City: this.billingDetails.city,
      Gov: this.billingDetails.gov,
      Street: this.billingDetails.street,

    }
    this.http.post(this.shippingApiUrl, shippingData).subscribe({
      next: (res) => {
        this.cartService.clearCart(); 
        localStorage.removeItem('paymentMethod'); 
        localStorage.removeItem('billingDetails')
        console.log("Shipping Created:", res);
      },
      error: (error) => {
        console.error("Error creating shipping:", error);
        alert('Failed to create shipping details.');
      }
    });
  }

}
