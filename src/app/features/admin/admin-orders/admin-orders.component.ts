import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { order } from '../../../core/models/order.model';
import { OrderService } from '../../../Services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
  providers: [DatePipe]
})
export class AdminOrdersComponent {
  orders: order[] = [];
  order!: order;
  filteredOrders: order[] = [];
  searchQuery: string = '';
  selectedStatus: any = '';


  constructor(private OrderService: OrderService, private datepipe: DatePipe) { }
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
  getStatusBadgeClass(status: number): string {
    switch (status) {
      case 0: return 'bg-warning';   // Pending
      case 1: return 'bg-success';   // Paid
      case 2: return 'bg-danger';    // Failed
      case 3: return 'bg-info';      // Refunded
      case 4: return 'bg-secondary'; // Cancelled
      default: return 'bg-dark';
    }
  }
}
