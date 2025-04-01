import { IRegisterUser, ILoginUser } from './../core/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './enviroment';
import {jwtDecode} from 'jwt-decode'

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
    console.log(RegisterObj);
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
  getDecodedToken():any{
    const token  = this.getToken();
    if (!token) return null;
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
getUserData(): any {
const decodedToken = this.getDecodedToken();
if (!decodedToken) return null;
const userData = {
  ID : decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null,
  Name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null,
  Email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null,
  ProfileImg: decodedToken['profileImg'] || null,
  Role : decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null,
  };
  return userData;
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


    getUserRole(): string | null {
      const decodedToken = this.getDecodedToken();
      if (!decodedToken) return null;
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (!role) return "Customer";
      try {
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log(this.getUserData());
        console.log(role);
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");
        console.log("______________________________________________________________________________________________________");

        return role ;
      } catch (error) {
        return null;
      }
    }



}
