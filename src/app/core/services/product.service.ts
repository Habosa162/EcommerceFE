// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { map, catchError, tap, delay } from 'rxjs/operators';
// import { Product, Review } from '../models/product.model';
// import { environment } from '../../Services/enviroment';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private productApiUrl = `${environment.apiUrl}/Product`;
//   //private useMockData = false; // Set to true to use face data instead of API calls
//   private useMockData = environment.useMockData;
//   // Face data - real product examples
//   private faceProducts: Product[] = [
//     {
//       id: 1,
//       name: 'Apple iPhone 13 Pro',
//       description: '5G smartphone with A15 Bionic chip, Super Retina XDR display, and Pro camera system',
//       price: 999,
//       subCategoryId: 1,
//       subCategoryName: 'Smartphones',
//       imageUrl: 'data:image/jpeg;base64,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',
//       stock: 50,
//       avgRate: 4.8,
//       brand: 'Apple',
//       discountAmount: 0,
//       isAccepted: true,
//       isDeleted: false,
//       color: 'Graphite',
//       finalPrice: 999,
//       title: 'iPhone 13 Pro 128GB',
//       category: 'Electronics',
//       reviewCount: 125,
//       priceRange: 'Above $300',
//       stockQuantity: 50,
//       reviews: [
//         { productId: 1, comment: 'Excellent camera quality', rating: 5 },
//         { productId: 1, comment: 'Battery life could be better', rating: 4 }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Sony WH-1000XM4',
//       description: 'Wireless noise-canceling headphones with 30-hour battery life',
//       price: 349.99,
//       subCategoryId: 2,
//       subCategoryName: 'Headphones',
//       imageUrl: 'data:image/jpeg;base64,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',
//       stock: 30,
//       avgRate: 4.7,
//       brand: 'Sony',
//       discountAmount: 50,
//       isAccepted: true,
//       isDeleted: false,
//       color: 'Black',
//       finalPrice: 299.99,
//       title: 'Sony WH-1000XM4 Wireless Headphones',
//       category: 'Electronics',
//       reviewCount: 89,
//       priceRange: '$200 - $300',
//       stockQuantity: 30,
//       reviews: [
//         { productId: 2, comment: 'Best noise cancellation ever', rating: 5 },
//         { productId: 2, comment: 'Very comfortable for long sessions', rating: 5 }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Nike Air Force 1',
//       description: 'Classic white sneakers with leather upper and Air cushioning',
//       price: 110,
//       subCategoryId: 3,
//       subCategoryName: 'Sneakers',
//       imageUrl: 'data:image/jpeg;base64,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',
//       stock: 100,
//       avgRate: 4.5,
//       brand: 'Nike',
//       discountAmount: 10,
//       isAccepted: true,
//       isDeleted: false,
//       color: 'White',
//       finalPrice: 100,
//       title: 'Nike Air Force 1 \'07 White',
//       category: 'Footwear',
//       reviewCount: 230,
//       priceRange: '$100 - $200',
//       stockQuantity: 100,
//       reviews: [
//         { productId: 3, comment: 'Classic design, very comfortable', rating: 5 },
//         { productId: 3, comment: 'True to size', rating: 4 }
//       ]
//     },
//     {
//       id: 4,
//       name: 'Nike Air Force 1',
//       description: 'Classic white sneakers with leather upper and Air cushioning',
//       price: 110,
//       subCategoryId: 3,
//       subCategoryName: 'Sneakers',
//       imageUrl: 'data:image/jpeg;base64,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',
//       stock: 100,
//       avgRate: 4.5,
//       brand: 'Nike',
//       discountAmount: 10,
//       isAccepted: true,
//       isDeleted: false,
//       color: 'White',
//       finalPrice: 100,
//       title: 'Nike Air Force 1 \'07 White',
//       category: 'Footwear',
//       reviewCount: 230,
//       priceRange: '$100 - $200',
//       stockQuantity: 100,
//       reviews: [
//         { productId: 3, comment: 'Classic design, very comfortable', rating: 5 },
//         { productId: 3, comment: 'True to size', rating: 4 }
//       ]
//     }

//   ];

//   constructor(private http: HttpClient) { }

//   // ==================== CORE METHODS ====================
//   getProducts(): Observable<Product[]> {
//     if (this.useMockData) {
//       return of(this.faceProducts).pipe(delay(500));
//     }

//     return this.http.get<Product[]>(this.productApiUrl).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getProducts', []))
//     );
//   }

//   getProductById(id: number): Observable<Product | undefined> {
//     if (this.useMockData) {
//       const product = this.faceProducts.find(p => p.id === id);
//       return of(product ? {...product} : undefined).pipe(delay(300));
//     }

//     return this.http.get<Product>(`${this.productApiUrl}/${id}`).pipe(
//       map(this.mapToProductModel),
//       catchError(this.handleError<Product | undefined>('getProductById', undefined))
//     );
//   }

//   // ==================== CRUD OPERATIONS ====================
//   createProduct(product: Omit<Product, 'id'>): Observable<Product> {
//     if (this.useMockData) {
//       const newProduct: Product = {
//         ...product,
//         id: Math.max(...this.faceProducts.map(p => p.id)) + 1,
//         finalPrice: product.price - (product.discountAmount || 0),
//         isAccepted: true,
//         isDeleted: false,
//         reviews: []
//       };
//       this.faceProducts.push(newProduct);
//       return of(newProduct).pipe(delay(500));
//     }

//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post<Product>(this.productApiUrl, product, { headers }).pipe(
//       map(this.mapToProductModel),
//       tap(p => console.log('Created product:', p)),
//       catchError(this.handleError<Product>('createProduct'))
//     );
//   }

//   updateProduct(id: number, product: Partial<Product>): Observable<Product> {
//     if (this.useMockData) {
//       const index = this.faceProducts.findIndex(p => p.id === id);
//       if (index >= 0) {
//         const updatedProduct = {
//           ...this.faceProducts[index],
//           ...product,
//           finalPrice: product.price ? 
//             (product.price - (product.discountAmount || this.faceProducts[index].discountAmount)) : 
//             this.faceProducts[index].finalPrice
//         };
//         this.faceProducts[index] = updatedProduct;
//         return of(updatedProduct).pipe(delay(500));
//       }
//       return throwError(() => new Error('Product not found'));
//     }

//     return this.http.put<Product>(`${this.productApiUrl}/${id}`, product).pipe(
//       map(this.mapToProductModel),
//       catchError(this.handleError<Product>('updateProduct'))
//     );
//   }

//   deleteProduct(id: number): Observable<boolean> {
//     if (this.useMockData) {
//       const index = this.faceProducts.findIndex(p => p.id === id);
//       if (index >= 0) {
//         this.faceProducts.splice(index, 1);
//         return of(true).pipe(delay(300));
//       }
//       return of(false).pipe(delay(300));
//     }

//     return this.http.delete(`${this.productApiUrl}/${id}`).pipe(
//       map(() => true),
//       catchError(this.handleError<boolean>('deleteProduct', false))
//     );
//   }

//   // ==================== FILTERING METHODS ====================
//   getProductsByCategory(category: string): Observable<Product[]> {
//     if (this.useMockData) {
//       const filtered = this.faceProducts.filter(p => 
//         p.category.toLowerCase() === category.toLowerCase() || 
//         p.subCategoryName.toLowerCase() === category.toLowerCase()
//       );
//       return of(filtered).pipe(delay(400));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/category/${category}`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getProductsByCategory', []))
//     );
//   }

//   getProductsByPriceRange(min: number, max: number): Observable<Product[]> {
//     if (this.useMockData) {
//       const filtered = this.faceProducts.filter(p => 
//         p.finalPrice >= min && p.finalPrice <= max
//       );
//       return of(filtered).pipe(delay(400));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/price-range?min=${min}&max=${max}`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getProductsByPriceRange', []))
//     );
//   }

//   getProductsByBrand(brand: string): Observable<Product[]> {
//     if (this.useMockData) {
//       const filtered = this.faceProducts.filter(p => 
//         p.brand.toLowerCase() === brand.toLowerCase()
//       );
//       return of(filtered).pipe(delay(400));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/brand/${brand}`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getProductsByBrand', []))
//     );
//   }

//   // ==================== REVIEW METHODS ====================
//   addReview(productId: number, review: Omit<Review, 'productId'>): Observable<Review> {
//     const fullReview: Review = { ...review, productId };
    
//     if (this.useMockData) {
//       const product = this.faceProducts.find(p => p.id === productId);
//       if (product) {
//         if (!product.reviews) product.reviews = [];
//         product.reviews.push(fullReview);
//         // Update average rating
//         product.avgRate = this.calculateAverageRating(product.reviews);
//         product.reviewCount = product.reviews.length;
//       }
//       return of(fullReview).pipe(delay(400));
//     }

//     return this.http.post<Review>(`${this.productApiUrl}/${productId}/reviews`, fullReview).pipe(
//       catchError(this.handleError<Review>('addReview'))
//     );
//   }

//   getReviewsByProductId(productId: number): Observable<Review[]> {
//     if (this.useMockData) {
//       const product = this.faceProducts.find(p => p.id === productId);
//       return of(product?.reviews || []).pipe(delay(400));
//     }

//     return this.http.get<Review[]>(`${this.productApiUrl}/${productId}/reviews`).pipe(
//       catchError(this.handleError<Review[]>('getReviewsByProductId', []))
//     );
//   }

//   // ==================== SEARCH METHOD ====================
//   searchProducts(query: string): Observable<Product[]> {
//     if (!query.trim()) {
//       return of([]);
//     }

//     if (this.useMockData) {
//       const searchTerm = query.toLowerCase();
//       const filtered = this.faceProducts.filter(p => 
//         p.name.toLowerCase().includes(searchTerm) || 
//         p.description.toLowerCase().includes(searchTerm) ||
//         p.brand.toLowerCase().includes(searchTerm)
//       );
//       return of(filtered).pipe(delay(600));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/search?q=${query}`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('searchProducts', []))
//     );
//   }

//   // ==================== FEATURED PRODUCTS ====================
//   getFeaturedProducts(productId: number): Observable<Product[]> {
//     if (this.useMockData) {
//       return of([this.faceProducts[0], this.faceProducts[1]]).pipe(delay(500));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/featured`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getFeaturedProducts', []))
//     );
//   }

//   getDiscountedProducts(): Observable<Product[]> {
//     if (this.useMockData) {
//       const filtered = this.faceProducts.filter(p => p.discountAmount > 0);
//       return of(filtered).pipe(delay(500));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/discounted`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getDiscountedProducts', []))
//     );
//   }

//   getNewArrivals(): Observable<Product[]> {
//     if (this.useMockData) {
//       return of([this.faceProducts[2]]).pipe(delay(500));
//     }

//     return this.http.get<Product[]>(`${this.productApiUrl}/new-arrivals`).pipe(
//       map(products => products.map(this.mapToProductModel)),
//       catchError(this.handleError<Product[]>('getNewArrivals', []))
//     );
//   }

//   // Add to your existing ProductService

// /**
//  * Get related products for a specific product
//  * @param productId The ID of the product to find related items for
//  */
// getRelatedProducts(productId: number): Observable<Product[]> {
//   if (this.useMockData) {
//     // Mock implementation - gets products from same category excluding current product
//     const currentProduct = this.faceProducts.find(p => p.id === productId);
//     if (!currentProduct) return of([]);
    
//     const related = this.faceProducts.filter(p => 
//       p.category === currentProduct.category && 
//       p.id !== productId
//     ).slice(0, 4); // Return max 4 related products
    
//     return of(related).pipe(delay(300));
//   }

//   return this.http.get<Product[]>(`${this.productApiUrl}/${productId}/related`).pipe(
//     map(products => products.map(this.mapToProductModel)),
//     catchError(this.handleError<Product[]>('getRelatedProducts', []))
//   );
// }

// /**
//  * Get all unique brands from products
//  */
// getBrands(): Observable<string[]> {
//   if (this.useMockData) {
//     // Extract unique brands from mock data
//     const brands = [...new Set(this.faceProducts.map(p => p.brand))];
//     return of(brands).pipe(delay(200));
//   }

//   return this.http.get<string[]>(`${this.productApiUrl}/brands`).pipe(
//     catchError(this.handleError<string[]>('getBrands', []))
//   );
// }

//   // ==================== PRIVATE HELPERS ====================
//   private mapToProductModel(product: any): Product {
//     const finalPrice = product.price - (product.discountAmount || 0);
    
//     return {
//       id: product.id,
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       subCategoryId: product.subCategoryId,
//       subCategoryName: product.subCategoryName,
//       imageUrl: product.imageUrl,
//       stock: product.stock,
//       avgRate: product.avgRate || 0,
//       brand: product.brand,
//       discountAmount: product.discountAmount || 0,
//       isAccepted: product.isAccepted ?? true,
//       isDeleted: product.isDeleted ?? false,
//       color: product.color || '',
//       finalPrice: finalPrice < 0 ? 0 : finalPrice,
//       title: product.title || product.name,
//       category: product.category || product.subCategoryName,
//       reviewCount: product.reviewCount || 0,
//       priceRange: this.getPriceRange(finalPrice),
//       stockQuantity: product.stockQuantity || product.stock,
//       reviews: product.reviews || []
//     };
//   }

//   private getPriceRange(price: number): string {
//     if (price < 100) return 'Under $100';
//     if (price <= 200) return '$100 - $200';
//     if (price <= 300) return '$200 - $300';
//     return 'Above $300';
//   }

//   private calculateAverageRating(reviews: Review[]): number {
//     if (!reviews || reviews.length === 0) return 0;
//     const sum = reviews.reduce((total, review) => total + review.rating, 0);
//     return parseFloat((sum / reviews.length).toFixed(1));
//   }

//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: HttpErrorResponse): Observable<T> => {
//       console.error(`${operation} failed:`, error);
      
//       let userMessage = 'An error occurred';
//       if (error.error instanceof ErrorEvent) {
//         userMessage = `A client error occurred: ${error.error.message}`;
//       } else {
//         userMessage = `Server returned code ${error.status}: ${error.message}`;
//       }
      
//       // In a real app, you might send the error to remote logging infrastructure
//       // and display a user-friendly message
      
//       return of(result as T);
//     };
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Product, Review } from '../models/product.model';
import { environment } from '../../Services/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl;
  private productsUrl = `${this.baseUrl}/product`;
  private categoriesUrl = `${this.baseUrl}/categories`;
  private reviewsUrl = `${this.baseUrl}/reviews`;

  constructor(private http: HttpClient) { }

  // ==================== CORE METHODS ====================
  // getProducts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.productsUrl).pipe(
  //     map(products => products.map(this.mapToProductModel)),
  //     catchError(this.handleError<any[]>('getProducts', []))
  //   );
  // }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // getProductById(id: number): Observable<Product | undefined> {
  //   return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
  //     map(this.mapToProductModel),
  //     catchError(this.handleError<Product | undefined>('getProductById', undefined))
  //   );
  // }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
      catchError(this.handleError<Product>('getProductById'))
    );
  }
  
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl).pipe(
      catchError(this.handleError<string[]>('getCategories', []))
    );
  }

  // ==================== REVIEW METHODS ====================
  addReview(review: Review): Observable<Review> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Review>(this.reviewsUrl, review, { headers }).pipe(
      catchError(this.handleError<Review>('addReview'))
    );
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewsUrl}/${productId}`).pipe(
      catchError(this.handleError<Review[]>('getReviewsByProductId', []))
    );
  }

  // ==================== FRONTEND FILTERING METHODS ====================
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase() || 
        p.subCategoryName.toLowerCase() === category.toLowerCase()
      ))
    );
  }
  

  getProductsByPriceRange(min: number, max: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => 
        p.finalPrice >= min && p.finalPrice <= max
      ))
    );
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => 
        p.brand.toLowerCase() === brand.toLowerCase()
      ))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      return of([]);
    }

    const searchTerm = query.toLowerCase();
    return this.getProducts().pipe(
      map(products => products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm))
      ))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.avgRate >= 4.5).slice(0, 4))
    );
  }

  getDiscountedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.discountAmount > 0))
    );
  }

  getNewArrivals(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => [...products]
        .sort((a, b) => b.id - a.id) // Assuming newer products have higher IDs
        .slice(0, 4))
    );
  }

  getRelatedProducts(productId: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        const currentProduct = products.find(p => p.id === productId);
        if (!currentProduct) return [];
        
        return products.filter(p => 
          p.category === currentProduct.category && 
          p.id !== productId
        ).slice(0, 4);
      })
    );
  }

  getBrands(): Observable<string[]> {
    return this.getProducts().pipe(
      map(products => {
        const brands = [...new Set(products.map(p => p.brand))];
        return brands.filter(brand => brand !== null && brand !== undefined);
      })
    );
  }
  

  // ==================== PRIVATE HELPERS ====================
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
      title: product.title || product.name,
      category: product.category || product.subCategoryName,
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
    if (price <= 500) return '$300 - $500';
    return 'Over $500';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      let userMessage = 'An error occurred';
      if (error.error instanceof ErrorEvent) {
        userMessage = `A client error occurred: ${error.error.message}`;
      } else {
        userMessage = `Server returned code ${error.status}: ${error.message}`;
      }
      
      return of(result as T);
    };
  }
}