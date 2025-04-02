import { IWishlist } from './../core/models/wishlist.model';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient,private authService:AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token  = this.authService.getToken() ; 
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }


  getWishList(): Observable<IWishlist[]> {
    const headers = this.getAuthHeaders() ; 
    return this.http.get<IWishlist[]>(this.baseUrl,{headers});  
  }

  addToWishList(productID: number): Observable<any> {
    const headers = this.getAuthHeaders() ; 
    const params = new HttpParams().set('productId', productID.toString());
    return this.http.post(this.baseUrl, {}, { headers,params });
  }
  removeFromWishList(productID: number):Observable<any>{
    const headers = this.getAuthHeaders() ;
    return this.http.delete(`${this.baseUrl}/${productID}`,{headers});  
  }
}
