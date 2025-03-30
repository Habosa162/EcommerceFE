import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { order } from '../../../core/models/order.model';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-admin-orders',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orders: order[] = [];
  filteredOrders: order[] = [];
  searchQuery: string = '';
  selectedStatus: any = '';


  constructor(private OrderService: OrderService) { }
  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.OrderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = orders;
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }


  getStatusClass(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Paid';
      case 2: return 'Failed';
      case 3: return 'Refunded';
      case 4: return 'Cancelled';
      default: return 'Unknown';
    }
  }
}
