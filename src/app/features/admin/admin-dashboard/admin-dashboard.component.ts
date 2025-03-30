import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { OrderService } from '../../../Services/order.service';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../Services/product.service';
import { AdminLayoutComponent } from "../../../layouts/admin-layout/admin-layout.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalCustomers: number = 0;
  totalOrders: number = 0;
  recentProducts: any[] = [];
  recentorders: any[] = [];





  constructor(
    private productService: ProductService,
    // private customerService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Fetch Total Products
    this.productService.getAllProducts().subscribe({
      next: (products: any[]) => {
        this.totalProducts = products.length;
        this.recentProducts = products.slice(-5); // Show last 5 added products
      },
      error: (err: any) => console.error('Error fetching products:', err)
    });

    // Fetch Total Customers
    // this.customerService.getAllCustomers().subscribe({
    //   next: (customers) => this.totalCustomers = customers.length,
    //   error: (err) => console.error('Error fetching customers:', err)
    // });

    // Fetch Total Orders
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.totalOrders = orders.length,
          this.recentorders = orders.slice(-5);
      },

      error: (err) => console.error('Error fetching orders:', err)
    });
  }
  getPaymentStatusText(status: number): string {
    switch (status) {
      case 0: return 'Pending';
      case 1: return 'Paid';
      case 2: return 'Failed';
      case 3: return 'Refunded';
      case 4: return 'Cancelled';
      default: return 'Unknown';
    }
  }
  deleteAllProducts(id: any): void {
    if (confirm("Are you sure you want to delete all products?")) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert("All products deleted!");
          this.fetchDashboardData(); // Refresh dashboard after deletion
        },
        error: (err) => console.error('Error deleting products:', err)
      });
    }
  }


}
