import { Product } from './product.model';

export type ApiResponse<T> =
  | {
      products: T | T[] | null;
      total: number;
      skip: number;
      limit: number;
    }
  | {
      users: T | T[] | null;
      total: number;
      skip: number;
      limit: number;
    };
