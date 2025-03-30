import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productApiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productApiUrl}`);
  }

  // Delete  products
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.productApiUrl}/{id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productApiUrl}`, product);
  }
}
