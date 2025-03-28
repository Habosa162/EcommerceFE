import { ILoginUser } from '../core/models/Auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoginEndPoint = `${environment.apiUrl}/Auth/login`;
  private RegisterEndPoint = `${environment.apiUrl}/Auth/register`;    
  
  constructor(private http:HttpClient) { }

  login(LoginObj:ILoginUser): Observable<any>{
    console.log(LoginObj);
    return this.http.post(this.LoginEndPoint, LoginObj);
  }
  register() : void{
    console.log('register');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn() : boolean{
    return !!localStorage.getItem('token'); 
  }
  logout() : void{
    localStorage.removeItem('token');
  }
}
