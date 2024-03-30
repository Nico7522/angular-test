import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from './models/product.model';
import { products } from './fake-data/fake-products';
import { User } from './user.service';
import { filter as f } from './method';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: Product[] = products;
  $products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.productList
  );

  products$ = this.$products.asObservable();
  constructor() {}

  getAll(): Observable<Product[]> {
    return of(this.productList);
  }

  filter(filter: Filter) {
    f(this.$products, filter, this.productList);
    // let filteredList = this.productList;

    // Object.keys(filter).forEach((key) => {
    //   if (filter[key as keyof typeof filter] !== '') {
    //     filteredList = filteredList.filter((item) => {
    //       if (
    //         typeof item[key as keyof typeof filter] === 'string' &&
    //         typeof filter[key as keyof typeof filter] === 'string'
    //       ) {
    //         return item[key as keyof typeof filter]
    //           .toLowerCase()
    //           .includes(filter[key as keyof typeof filter].toLowerCase());
    //       }
    //       return false;
    //     });
    //   }
    // });

    // this.$products.next(filteredList);
  }
}

// return u[key].toLowerCase().includes(value.toLowerCase());
export interface Filter {
  name: string;
  description: string;
}

// return Object.keys(filter).forEach((k) => {
//   return k.valueOf().toLowerCase().includes(u[key].toLowerCase());
// });

// return (
//   u.name.toLowerCase().includes(filter.name.toLowerCase()) &&
//   u.description.toLowerCase().includes(filter.description.toLowerCase())
// );
