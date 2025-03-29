import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CustomerLayoutComponent } from './layouts/customer-layout/customer-layout.component';
import { Router, RouterModule } from '@angular/router';
// import { HomeComponent } from './core/components/home/home.component';
// import { ProductListComponent } from './core/components/product-list/product-list.component';
// import { ProductDetailsComponent } from './core/components/product-details/product-details.component';



@Component({
  selector: 'app-root',
  imports: [CustomerLayoutComponent , RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EcommerceFE';
}
