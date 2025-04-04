import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productApiUrl}`);
  }


  getProductById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.productApiUrl}/${id}`);
  }
  // Delete  products
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.productApiUrl}/${id}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.productApiUrl}`, productData);
  }

  updateProduct(productData: FormData, productId: number): Observable<Product> {
    return this.http.put<Product>(`${this.productApiUrl}/${productId}`, productData);
  }

  //get product by subcategory id
  getProductsBySubCategoryId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApiUrl}/subcategory/${id}`);
  }

  //get product top-selled products
  getTopSellingProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.productApiUrl}/top-sold?count=${count}`
    );
  }
}
