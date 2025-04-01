import {SubCategory} from './subCategory.model';
export interface Category {
  id: number;
  name: string;
  imgUrl: string;
  subCategories: SubCategory[];
}
