import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoginEndPoint = "https://localhost:7280/api/Auth/login";
  private RegisterEndPoint = "https://localhost:7280/api/Auth/register";    

  
  constructor() { }

  login(): void {
    console.log('login');
  }
  register() : void{
    console.log('register');
  }
}
