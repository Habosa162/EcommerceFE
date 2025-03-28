import { Component, OnInit } from '@angular/core';
import { order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: order[] = [];
  customerId: string = ''; 

  constructor(private orderService: OrderService) { }
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
  
}
