import { Component, OnInit } from '@angular/core';
import { order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: order[] = [];
  customerId: string = ''; 
  apiUrl: string = 'https://localhost:7280/api/Order';

  constructor(private orderService: OrderService, private http:HttpClient) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      this.customerId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.orderService.getUserOrders(this.customerId).subscribe({
        next: (data) => {
          this.orders = data;
          console.log('Orders fetched successfully:', this.orders);
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
        }
      });
      
    }
  }
  getPaymentStatusText(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Paid';
      case 2: return 'Failed';
      case 3: return 'Refunded';
      default: return 'Unknown';
    }
  }
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Order has been canceled and refunded.');
        this.orders = this.orders.map(order =>
          order.id === orderId ? { ...order, paymentStatus: 3 } : order
        );
      },
      error: () => {
        alert('Failed to cancel the order.');
      }
    });
  }
  
  
}
