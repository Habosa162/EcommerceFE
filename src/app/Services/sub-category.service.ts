import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { Observable } from 'rxjs';
import { SubCategory } from '../core/models/subCategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private apiUrl = `${environment.apiUrl}/SubCategories`;

  constructor(private http: HttpClient) { }


  getsubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}`);
  }


  getsubCategoryById(id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.apiUrl}/${id}`);
  }


}
