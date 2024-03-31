import { Component, Signal, computed, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductService } from '../product.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  ignoreElements,
  map,
  of,
  startWith,
} from 'rxjs';
import { Product } from '../models/product.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ApiResponse } from '../models/api-response';
import { ViewModel, VmSignal } from '../models/view-model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardModule, AsyncPipe, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private _productService = inject(ProductService);
  products!: Product[];
  error: string = '';
  $product: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products
  );

  // vm$
  vm$: Observable<ViewModel<ApiResponse<Product[]>>> = this._productService
    .getAll()
    .pipe(
      map((result) => ({ status: 'result' as const, result })),
      startWith({ status: 'loading' as const }),
      catchError((error) => of({ status: 'error' as const, error }))
    );

  // Signal
  productsSignal: Signal<VmSignal<Product[]> | undefined> = toSignal(
    this._productService.getAll().pipe(
      map((result) => ({
        data: result,
        error: null,
        loading: false,
      })),
      startWith({ data: null, loading: true, error: null }),
      catchError((error) => of({ data: null, error: 'error', loading: false }))
    )
  );

  // Async pipe
  $products!: Observable<ApiResponse<Product[]>>;
  ngOnInit() {
    this.$products = this._productService.getAll().pipe(
      catchError((err) => {
        this.error = 'Erreur';
        return of();
      })
    );
  }
}
