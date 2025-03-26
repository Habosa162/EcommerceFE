import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
// import { HomeComponent } from './core/components/home/home.component';
// import { ProductListComponent } from './core/components/product-list/product-list.component';
// import { ProductDetailsComponent } from './core/components/product-details/product-details.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EcommerceFE';
}
