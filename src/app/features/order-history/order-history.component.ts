import { Component, OnInit } from '@angular/core';
import { order } from '../../core/models/order.model';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShippingService } from '../../Services/shipping.service';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: order[] = [];
  deliveredOrders: order[] = [];
  pendingOrders: order[] = [];
  shippedOrders: order[] = [];
  cancelledOrders: order[] = [];
  activeTab: string = 'shipping';
  customerId: string = '';

  constructor(private orderService: OrderService, private shippingService: ShippingService ,private http:HttpClient,private cartService:CartService,private productService:ProductService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      this.customerId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      console.log("Decoded token:", decodedToken);
      console.log("Customer ID:", this.customerId);
      this.orderService.getUserOrders(this.customerId).subscribe({
        next: (data) => {
          this.orders = data;

          console.log('Orders fetched successfully:', this.orders);
          this.categorizeOrders();
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
        }
      });

    }
  }
  categorizeOrders() {
    this.deliveredOrders = this.orders.filter(o => o.shippingStatus === 2); // Delivered
    console.log(this.deliveredOrders);
    this.pendingOrders = this.orders.filter(o => o.shippingStatus === 0); // Pending
    console.log(this.pendingOrders);
    this.shippedOrders = this.orders.filter(o => o.shippingStatus === 1);  // Shipped
    console.log(this.shippedOrders);
    this.cancelledOrders = this.orders.filter(o => o.paymentStatus === 3 || o.paymentStatus === 4); // Refunded or Cancelled
    console.log(this.cancelledOrders);
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
  cancelOrder(orderId: number) {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        if(confirm('Are you sure you want to cancel this order?')) {
          this.orders = this.orders.map(order =>
            order.id === orderId ? { ...order, paymentStatus: 3 } : order
          );
          alert('Order has been canceled.');
        }

      },
      error: () => {
        alert('Failed to cancel the order.');
      }
    });
  }

  reorder(order: order) {
    order.orderItems.forEach((item) => {
      const product = {
        id: item.productId,
        name: item.name,
        finalPrice: item.unitPrice,
        imgUrl: item.productImg
      };
      for (let i = 0; i < item.qty; i++) {
        this.cartService.addToCart(product);
      }

    });

    alert('Order added to cart! Proceed to checkout.');
  }


}
