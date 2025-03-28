import { Component } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService : AuthService) { }
  login(): void {
    this.authService.login();
  }
}
