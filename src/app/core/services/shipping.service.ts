import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  baseUrl: string = 'https://localhost:7280/api/Shipping/GetShippingByOrderId';

  constructor(private http:HttpClient) { }

    GetShippingByOrderId(orderId: number) {
      return this.http.get<any>(`${this.baseUrl}/${orderId}`);
    }

    updateShippingStatus(orderId: number, shippingStatus: number) {
      
    }



  

}
