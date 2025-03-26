export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    reviews: Review[];
  }
  
  export interface Review {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    comment: string;
  }