import { IRegisterUser, ILoginUser } from './../core/models/auth.model';
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

  constructor(private http: HttpClient) { }

  login(LoginObj: ILoginUser): Observable<any> {
    console.log(LoginObj);
    return this.http.post(this.LoginEndPoint, LoginObj);
  }
  register(RegisterObj: FormData): Observable<any> {
    return this.http.post(this.RegisterEndPoint, RegisterObj);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      return payload.username || null; // Adjust based on backend response
    } catch (error) {
      return null;
    }
  }
}
