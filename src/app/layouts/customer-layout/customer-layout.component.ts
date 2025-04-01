import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterOutlet, NavbarComponent,FooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

  userRole :string | null = '';
  constructor(private authService : AuthService) {
    this.userRole = this.authService.getUserRole()=== null ? 'Customer' : this.authService.getUserRole();
  }

  isCustomer(): boolean {
    return this.userRole=='Customer';
  }
}
