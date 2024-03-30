import { Product } from './product.model';

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
