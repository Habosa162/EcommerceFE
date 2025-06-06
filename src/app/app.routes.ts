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
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { CategoryDetailsComponent } from './core/components/category-details/category-details.component';
import { AdminProductsComponent } from './features/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './features/admin/admin-orders/admin-orders.component';
import { CreateproductComponent } from './features/admin/createproduct/createproduct.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

//import { WishlistComponent } from './features/wishlist/wishlist.component';
import { AdminUserComponent } from './features/admin/admin-user/admin-user.component';

import { WishlistComponent } from './features/wishlist/wishlist.component';
import { AdminPDetailsComponent } from './features/admin/admin-pdetails/admin-pdetails.component';
import { OrderDComponent } from './features/admin/order-d/order-d.component';
import { customerGuard } from './guards/customer.guard';

export const routes: Routes = [
  // 🌟 Customer Routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [customerGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'products',
    component: ProductListComponent,
    title: 'Products',
    canActivate: [customerGuard],
  },

  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
    canActivate: [customerGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'category-details/:id', component: CategoryDetailsComponent },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard, customerGuard],
  },

  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category-details/:id',
    component: CategoryDetailsComponent,
    title: 'Category Details',
    canActivate: [customerGuard],
  },

  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'manageproducts',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'users',
    component: AdminUserComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'createproduct',
    component: CreateproductComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'orderD/:id',
    component: OrderDComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'product-details/:id',
    component: AdminPDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },

  // {
  //   path: 'admin',
  //   component: AdminLayoutComponent,
  //   // pathMatch:'full',
  //   canActivate: [AuthGuard, RoleGuard],
  //   children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: AdminDashboardComponent },
  //     { path: 'products', component: AdminProductsComponent },
  //     { path: 'orders', component: AdminOrdersComponent },
  //     { path: 'users', component: AdminUserComponent },
  //     { path: 'createproduct', component: CreateproductComponent },
  //   ],
  // },

  { path: '**', component: NotFoundComponent },

  // go to from category to product

  // {
  //   path: 'products',
  //   component: ProductListComponent,
  //   children: [
  //     { path: '', component: ProductListComponent }, // Base route (all products)
  //     { path: 'category/:categoryName', component: ProductListComponent } // Category filter
  //   ]
  // },
];
