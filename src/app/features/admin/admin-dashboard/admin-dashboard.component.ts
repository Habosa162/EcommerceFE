import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { OrderService } from '../../../Services/order.service';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../Services/user.service';
// import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalCustomers: number = 0;
  totalOrders: number = 0;
  recentProducts: any[] = [];
  recentorders: any[] = [];

  constructor(
    private productService: ProductService,
    private customerService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  // ngAfterViewInit(): void {
  //   // Initialize the charts here
  //   this.initializeCharts();
  // }

  // initializeCharts(): void {
  //   // Chart setup
  //   new Chart('productChart', {
  //     type: 'bar',  // The chart type
  //     data: {
  //       labels: ['Product 1', 'Product 2', 'Product 3'],
  //       datasets: [{
  //         label: 'Product Sales',
  //         data: [12, 19, 3],
  //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {

  //         y: {
  //           type: 'linear',
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }

  fetchDashboardData(): void {
    // Fetch Total Products
    this.productService.getAllProducts().subscribe({
      next: (products: any[]) => {
        this.totalProducts = products.length;
        this.recentProducts = products.slice(-5); // Show last 5 added products
      },
      error: (err: any) => console.error('Error fetching products:', err),
    });

    // Fetch Total Customers
    this.customerService.getAllUsers().subscribe({
      next: (customers) => (this.totalCustomers = customers.length),
      error: (err) => console.error('Error fetching customers:', err),
    });

    // Fetch Total Orders
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        (this.totalOrders = orders.length),
          (this.recentorders = orders.slice(-5));
      },

      error: (err) => console.error('Error fetching orders:', err),
    });
  }
  getPaymentStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Paid';
      case 2:
        return 'Failed';
      case 3:
        return 'Refunded';
      case 4:
        return 'Cancelled';
      default:
        return 'Unknown';
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
  deleteProducts(id: any): void {
    if (confirm('Are you sure you want to delete all products?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('All products deleted!');
          this.fetchDashboardData(); // Refresh dashboard after deletion
        },
        error: (err) => console.error('Error deleting products:', err),
      });
    }
  }
}
