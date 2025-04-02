import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroment';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private apiUrl = `${environment.apiUrl}/subcategories`;
  constructor(private myHttp: HttpClient) {}
}
