import { IProduct } from './product.model';
export interface IWishlist {
  id: number;
  productId: number;
  customerId: string;
  product: IProduct | null;
}