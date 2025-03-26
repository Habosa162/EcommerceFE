import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductDetailsComponent } from './features/product/product-details/product-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent }, // Home route
    { path: 'products', component: ProductListComponent , title : 'product' }, // Product listing route
    { path: 'products/:id', component: ProductDetailsComponent , title : 'product details'}, // Product details route
    { path: '**', redirectTo: '/home' }, // Fallback route for 404path: 'products/:id', component: ProductDetailsComponent },

];
