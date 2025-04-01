import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { Router, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from './core/components/home/home.component';
// import { ProductListComponent } from './core/components/product-list/product-list.component';
// import { ProductDetailsComponent } from './core/components/product-details/product-details.component';



@Component({
  selector: 'app-root',
  imports: [CustomerLayoutComponent, RouterModule, AdminLayoutComponent ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EcommerceFE';
  userRole :string | null = '';
  constructor(private authService : AuthService ){
    this.userRole = this.authService.getUserRole()=== null ? 'Customer' : this.authService.getUserRole();
  }
  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }
  isCustomer(): boolean {
    return this.userRole === 'Customer';
  }
}


