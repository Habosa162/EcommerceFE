import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ProductDetailsComponent } from './features/product/product-details/product-details.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { PaymentSuccessComponent } from './features/payment-success/payment-success.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { OrderHistoryComponent } from './features/order-history/order-history.component';
import { OrderDetailsComponent } from './features/order-details/order-details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent }, // Home route
    { path: 'login', component: LoginComponent }, // Login route
    { path: 'register', component: RegisterComponent }, // Register route
    { path: 'products', component: ProductListComponent , title : 'product' }, // Product listing route
    { path: 'products/:id', component: ProductDetailsComponent , title : 'product details'}, // Product details route
    { path: 'cart', component: CartComponent },
    { path: 'payment-success', component: PaymentSuccessComponent },
    { path: 'checkout', component: CheckoutComponent },
    {path: 'order-history', component: OrderHistoryComponent}, // Order history route
    {path: 'order-details/:id', component: OrderDetailsComponent}, // Order history route with ID parameter


    { path: '**', redirectTo: '/home' }, // Fallback route for 404path: 'products/:id', component: ProductDetailsComponent },

];
