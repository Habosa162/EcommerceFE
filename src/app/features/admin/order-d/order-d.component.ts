import { Component, OnInit } from '@angular/core';
import { order } from '../../../core/models/order.model';
import { OrderService } from '../../../Services/order.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-d',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './order-d.component.html',
  styleUrl: './order-d.component.css',
  providers: [DatePipe]
})
export class OrderDComponent implements OnInit {
  order!: order;

  constructor(private orderservice: OrderService, private route: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit(): void {
    const orderid = +this.route.snapshot.paramMap.get('id')!;
    this.orderservice.getOrderById(orderid).subscribe({
      next: (order: any) => {
        this.order = order;
        console.log(order)

      },
      error: (err) => console.error('Error fetching product details:', err),
    });
  }
  // In your component.ts file
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

  getShippingStatusText(status: number): string {
    switch (status) {
      case 1: return 'Shipped';
      case 2: return 'Delivered';
      default: return 'Processing';
    }
  }





  printOrder(): void {
    const printContent = document.getElementById('print-content')?.innerHTML;  // Get the HTML of the print content
    if (printContent) {
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow?.document.write(`
        <html>
          <head>
            <title>Print Order</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .table { width: 100%; border-collapse: collapse; }
              .table th, .table td { padding: 8px; border: 1px solid #ddd; }
              .badge { font-size: 14px; }
              .mt-4 { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      newWindow?.document.close(); // Close the document to render the content
      newWindow?.print();  // Trigger the print
    }
  }

}
