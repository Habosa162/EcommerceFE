import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { Observable } from 'rxjs';
import { order } from '../core/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderApiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/all`);
  }
   getUserOrders(customerId: string) {
      return this.http.get<order[]>(`${this.orderApiUrl}/GetUserOrders/${customerId}`);
    }
    getOrderById(orderId: any) {
      return this.http.get<order>(`${this.orderApiUrl}/${orderId}`);
    }
    cancelOrder(orderId: number) {
      return this.http.put(`${this.orderApiUrl}/${orderId}/cancel`, {});
    }
}
