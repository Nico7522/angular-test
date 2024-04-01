import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Product } from './models/product.model';
import { User } from './user.service';
import { filter as f } from './method';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from './models/api-response';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _httpClient = inject(HttpClient);

  constructor() {}

  getAll(skip: number, limit: number): Observable<ProductResponse> {
    return this._httpClient
      .get<ProductResponse>(
        `${environment.API_URL}/products?limit=${limit}&skip=${skip}`
      )
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  filter(filter: Filter) {
    // f(this._$products, filter, this.productList);
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
