import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  order : any ;
  constructor(private route:ActivatedRoute,private orderService:OrderService){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      this.orderService.getOrderById(orderId).subscribe(order => {
        this.order = order;
      });
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

}
