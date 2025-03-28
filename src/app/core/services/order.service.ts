import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'https://localhost:7280/api/Order';

  
  constructor(private http:HttpClient) { }

  getUserOrders(customerId: string) {
    
    return this.http.get<order[]>(`${this.baseUrl}/GetUserOrders/${customerId}`);

  }
  getOrderById(orderId: number) {
    return this.http.get<order>(`${this.baseUrl}/${orderId}`);
  }
}
