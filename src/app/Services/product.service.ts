import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productApiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productApiUrl}`);
  }

  // Delete all products
  deleteAllProducts(): Observable<any> {
    return this.http.delete(`${this.productApiUrl}/deleteAll`);
  }
}
