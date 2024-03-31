import { Product } from './product.model';
import { User } from './user.model';

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
