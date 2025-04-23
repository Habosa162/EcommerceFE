import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Adcategory } from '../core/models/adcategory.model';
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Adcategory[]> {
    return this.http.get<Adcategory[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: number): Observable<Adcategory> {
    return this.http.get<Adcategory>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Adcategory): Observable<any> {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(id: number, category: Adcategory): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
