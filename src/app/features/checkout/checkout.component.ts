import { Component, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems = computed(() => this.cartService.getCart());

  totalPrice: number = 0;
  paymentMethod= 'COD';

  apiUrl: string = 'https://your-backend.com/api/orders'; // Replace with your actual API URL

  billing = {
    first_name: '',
    last_name: '',
    email: '',
    street: '',
    city: '',
    gov:'',
    country:'',
    phone_number: '',

  };

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {  }
  ngOnInit(): void {

    this.totalPrice = this.cartService.getTotalPrice();
  }

  processPayment() {
    if (!this.billing.first_name || !this.billing.last_name || !this.billing.email ||
        !this.billing.street || !this.billing.city || !this.billing.phone_number) {
      alert('Please fill in all billing details.');
      return;
    }
    localStorage.setItem('paymentMethod', this.paymentMethod);
    localStorage.setItem('billingDetails', JSON.stringify(this.billing));
    if (this.paymentMethod === 'Paymob') {
      this.placeOrder();
    } else {
      window.location.href = 'http://localhost:4200/payment-success';
    }
  }


  placeOrder() {
    const orderData = {
      amount: this.totalPrice * 100,  // Convert to cents
      currency: "EGP",
      payment_methods: [4419883, 4437311, 4437297],
      items: this.cartItems().map((item: any) => ({
        name: item.name,
        amount: item.finalPrice * 100,
        description: "E-commerce product",
        quantity: item.quantity
      })),
      billing_data: this.billing,
      extras: { id: "USER_ID" },
      redirection_url: "http://localhost:4200/payment-success"
    };

    console.log("Order Data to Paymob:", orderData);

    this.http.post("https://accept.paymob.com/v1/intention/", orderData, {
      headers: { "Authorization": "Token egy_sk_test_68ef89025e9a21df799c8de6e552495b278ed90f7416655c5528e35ebedd8c64" }
    }).subscribe({
      next: (response: any) => {
        const clientSecret = response.client_secret;
        const paymentUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_jrlnWL5oJX8IRTp9xpeHq5mmQhAMfXES&clientSecret=${clientSecret}`;

        window.location.href = paymentUrl;  // Redirect to payment page
      },
      error: (error) => {
        console.error("Error in Paymob API request:", error);
        alert("Failed to process payment. Please try again.");

      }
    });
}


}
