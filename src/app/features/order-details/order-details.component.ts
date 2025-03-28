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

}
