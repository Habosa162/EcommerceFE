export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  subCategoryId: number;
  subCategoryName: string;
  imageUrl: string;
  stock: number;
  avgRate: number;
  brand: string;
  discountAmount: number;
  isAccepted: boolean;
  isDeleted: boolean;
  color: string;
  finalPrice: number;
  title: string;
  category: string;
  reviewCount: number;
  priceRange: string;
  stockQuantity: number;
  reviews?: Review[];
}export interface ProductDto {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  SubCategoryId: number;
  SubCategoryName: string;
  ImageUrl: string;
  Stock: number;
  AvgRate: number;
  Brand: string;
  DiscountAmount: number;
  IsAccepted: boolean;
  IsDeleted: boolean;
  color: string;
  finalPrice: number;
}

export interface Review {
  productId: number;
  comment: string;
  rating: number;
  // createdAt: Date;
  // userName: string;
}
