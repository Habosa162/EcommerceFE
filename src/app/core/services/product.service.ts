import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, Review } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/products';

  constructor(private http: HttpClient) {}

  // Core Methods
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map(this.mapToProductModel),
      catchError(() => of(undefined))
    );
  }

  // Filtering Methods
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  getProductsByPriceRange(min: number, max: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/price-range?min=${min}&max=${max}`
    ).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/brand/${brand}`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  // Review Methods
  addReview(productId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(
      `${this.apiUrl}/${productId}/reviews`, 
      review
    );
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${productId}/reviews`).pipe(
      catchError(() => of([]))
    );
  }

  // Search Method
  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  // Product Management
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      map(this.mapToProductModel),
      catchError((error) => {
        console.error('Error creating product:', error);
        throw error;
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      map(this.mapToProductModel),
      catchError((error) => {
        console.error('Error updating product:', error);
        throw error;
      })
    );
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error deleting product:', error);
        return of(false);
      })
    );
  }

  // Additional Features
  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  getDiscountedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/discounted`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  getNewArrivals(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/new-arrivals`).pipe(
      map(products => products.map(this.mapToProductModel)),
      catchError(() => of([]))
    );
  }

  // Private helper method to ensure all products have complete model structure
  private mapToProductModel(product: any): Product {
    const finalPrice = product.price - (product.discountAmount || 0);
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      subCategoryId: product.subCategoryId,
      subCategoryName: product.subCategoryName,
      imageUrl: product.imageUrl,
      stock: product.stock,
      avgRate: product.avgRate || 0,
      brand: product.brand,
      discountAmount: product.discountAmount || 0,
      isAccepted: product.isAccepted ?? true,
      isDeleted: product.isDeleted ?? false,
      color: product.color || '',
      finalPrice: finalPrice < 0 ? 0 : finalPrice,
      title: product.title || product.name, // Fallback to name if no title
      category: product.category || product.subCategoryName, // Fallback to subCategoryName
      reviewCount: product.reviewCount || 0,
      priceRange: this.getPriceRange(finalPrice),
      stockQuantity: product.stockQuantity || product.stock,
      reviews: product.reviews || []
    };
  }

  private getPriceRange(price: number): string {
    if (price < 100) return 'Under $100';
    if (price <= 200) return '$100 - $200';
    if (price <= 300) return '$200 - $300';
    return 'Above $300';
  }
}